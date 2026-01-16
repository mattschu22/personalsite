import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  PaxosState,
  StatusMessage,
  ConsensusLogEntry,
  Packet,
  PacketType,
  NodeState,
  CategoryType,
} from './paxosTypes';
import { consensusValues, nodeConfigs } from './paxosData';

// Simulated network delay range (ms) - high variance helps one proposer win
const MIN_LATENCY = 200;
const MAX_LATENCY = 600;
const CONSENSUS_DISPLAY_TIME = 1500;
const IDLE_TIME = 1200;
// Wide propose delay range creates clear "first mover" advantage
const MIN_PROPOSE_DELAY = 50;
const MAX_PROPOSE_DELAY = 800;
// Timeout for leader election - if no leader elected, retry
const LEADER_ELECTION_TIMEOUT = 1500;

const getRandomLatency = () => MIN_LATENCY + Math.random() * (MAX_LATENCY - MIN_LATENCY);
const getRandomProposeDelay = () => MIN_PROPOSE_DELAY + Math.random() * (MAX_PROPOSE_DELAY - MIN_PROPOSE_DELAY);

const getInitialValueIndices = (): Record<CategoryType, number> => ({
  education: 0,
  experience: 0,
  skills: 0,
  projects: 0,
  achievements: 0,
  languages: 0,
});

const getInitialState = (): PaxosState => ({
  phase: 'idle',
  activeProposers: new Set(),
  winningProposer: null,
  consensusValue: null,
  consensusCategory: null,
  roundNumber: 0,
  valueIndices: getInitialValueIndices(),
});

export interface UsePaxosSimulationReturn {
  state: PaxosState;
  nodeStates: NodeState[];
  packets: Packet[];
  statusMessages: StatusMessage[];
  consensusLog: ConsensusLogEntry[];
}

export function usePaxosSimulation(): UsePaxosSimulationReturn {
  const [state, setState] = useState<PaxosState>(getInitialState);
  const [nodeStates, setNodeStates] = useState<NodeState[]>([]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [consensusLog, setConsensusLog] = useState<ConsensusLogEntry[]>([]);

  const animationFrameRef = useRef<number>();

  // Critical state tracking via refs to avoid race conditions
  const roundRef = useRef(0);
  const nodePromisedRef = useRef<Map<number, number | null>>(new Map()); // nodeId -> promisedToProposerId
  const nodeAcceptedRef = useRef<Set<number>>(new Set()); // nodeIds that have accepted
  const promisesReceivedRef = useRef<Map<number, Set<number>>>(new Map()); // proposerId -> Set of nodeIds that promised
  const acceptedsReceivedRef = useRef<Set<number>>(new Set()); // nodeIds that sent accepted
  const winnerDeclaredRef = useRef(false);
  const winningProposerIdRef = useRef<number | null>(null);
  const consensusReachedRef = useRef(false);
  const processedPacketIdsRef = useRef<Set<string>>(new Set());
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addStatusMessage = useCallback((text: string, type: StatusMessage['type']) => {
    setStatusMessages(prev => [{
      id: `${Date.now()}-${Math.random()}`,
      text,
      type,
      timestamp: Date.now(),
    }, ...prev].slice(0, 5));
  }, []);

  const createPacket = useCallback((
    type: PacketType,
    from: number,
    to: number,
    round: number,
    value?: string
  ): Packet => ({
    id: `${round}-${type}-${from}-${to}-${Date.now()}-${Math.random()}`,
    type,
    from,
    to,
    progress: 0,
    startTime: Date.now(),
    duration: getRandomLatency(),
    arrived: false,
    value,
    proposalNumber: round * 10 + from,
  }), []);

  // Start a new round - all nodes begin proposing with random delays
  const startNewRound = useCallback(() => {
    // Clear any existing retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    const newRound = roundRef.current + 1;
    roundRef.current = newRound;

    // Reset all tracking refs
    nodePromisedRef.current = new Map();
    nodeConfigs.forEach(n => nodePromisedRef.current.set(n.id, null));
    nodeAcceptedRef.current = new Set();
    promisesReceivedRef.current = new Map();
    nodeConfigs.forEach(n => promisesReceivedRef.current.set(n.id, new Set()));
    acceptedsReceivedRef.current = new Set();
    winnerDeclaredRef.current = false;
    winningProposerIdRef.current = null;
    consensusReachedRef.current = false;
    processedPacketIdsRef.current = new Set();

    setState(prev => {
      // Initialize node states with their proposed values
      const newNodeStates: NodeState[] = nodeConfigs.map(config => {
        const categoryValues = consensusValues.find(cv => cv.category === config.category)?.values || [];
        const valueIndex = prev.valueIndices[config.category];
        return {
          id: config.id,
          highestPromised: 0,
          hasPromised: false,
          promisedTo: null,
          hasAccepted: false,
          proposalNumber: newRound * 10 + config.id,
          proposedValue: categoryValues[valueIndex] || '',
        };
      });
      setNodeStates(newNodeStates);

      return {
        ...prev,
        phase: 'proposing',
        activeProposers: new Set(),
        winningProposer: null,
        consensusValue: null,
        consensusCategory: null,
        roundNumber: newRound,
      };
    });

    setPackets([]);

    // Each node starts proposing with a random delay
    nodeConfigs.forEach((config) => {
      const delay = getRandomProposeDelay();
      setTimeout(() => {
        // Check if still in correct round
        if (roundRef.current !== newRound) return;

        addStatusMessage(`${config.label} proposing`, 'prepare');

        setState(prev => ({
          ...prev,
          activeProposers: new Set([...prev.activeProposers, config.id]),
        }));

        // Send prepare packets to ALL nodes including self
        // Self-prepare goes through normal packet flow with latency
        // This ensures fair competition - first proposer to reach 4 acceptors wins
        const preparePackets = nodeConfigs.map(n =>
          createPacket('prepare', config.id, n.id, newRound)
        );

        setPackets(prev => [...prev, ...preparePackets]);
      }, delay);
    });

    // Set up retry timeout - if no leader elected within timeout, retry
    retryTimeoutRef.current = setTimeout(() => {
      if (roundRef.current === newRound && !winnerDeclaredRef.current) {
        addStatusMessage('No majority, retrying...', 'info');
        startNewRound();
      }
    }, LEADER_ELECTION_TIMEOUT);
  }, [addStatusMessage, createPacket]);

  // Handle packet arrivals
  const handlePacketArrival = useCallback((packet: Packet) => {
    const currentRound = roundRef.current;

    // Extract round from packet id
    const packetRound = parseInt(packet.id.split('-')[0]);
    if (packetRound !== currentRound) return;

    // Prevent duplicate processing
    if (processedPacketIdsRef.current.has(packet.id)) return;
    processedPacketIdsRef.current.add(packet.id);

    const toNode = nodeConfigs[packet.to];
    const fromNode = nodeConfigs[packet.from];

    switch (packet.type) {
      case 'prepare': {
        // Check if this node has already promised (using ref, not state)
        const alreadyPromisedTo = nodePromisedRef.current.get(packet.to);
        if (alreadyPromisedTo !== null) return; // Already promised to someone

        // Mark as promised IMMEDIATELY via ref
        nodePromisedRef.current.set(packet.to, packet.from);

        // Update React state for UI
        setNodeStates(prev => prev.map(n =>
          n.id === packet.to ? { ...n, hasPromised: true, promisedTo: packet.from } : n
        ));

        addStatusMessage(`${toNode.label} → ${fromNode.label}`, 'promise');

        // Send promise back
        setTimeout(() => {
          if (roundRef.current !== currentRound) return;
          const promisePacket = createPacket('promise', packet.to, packet.from, currentRound);
          setPackets(prev => [...prev, promisePacket]);
        }, 50);
        break;
      }

      case 'promise': {
        // Check if winner already declared
        if (winnerDeclaredRef.current) return;

        // Record this promise
        const proposerPromises = promisesReceivedRef.current.get(packet.to);
        if (!proposerPromises) return;

        // Check if we already counted this promise
        if (proposerPromises.has(packet.from)) return;
        proposerPromises.add(packet.from);

        // Check for majority (need 4 promises from 6 nodes - absolute majority)
        if (proposerPromises.size >= 4 && !winnerDeclaredRef.current) {
          winnerDeclaredRef.current = true;
          winningProposerIdRef.current = packet.to;

          // Clear retry timeout since we have a leader
          if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
            retryTimeoutRef.current = null;
          }

          addStatusMessage(`${toNode.label} elected leader`, 'info');

          setState(prev => ({
            ...prev,
            phase: 'accepting',
            winningProposer: packet.to,
          }));

          // Send accept packets
          setTimeout(() => {
            if (roundRef.current !== currentRound) return;

            addStatusMessage(`${toNode.label} broadcasting`, 'accept');

            // Get the proposer's value
            const proposerConfig = nodeConfigs[packet.to];
            setState(prev => {
              const valueIndex = prev.valueIndices[proposerConfig.category];
              const categoryValues = consensusValues.find(cv => cv.category === proposerConfig.category)?.values || [];
              const value = categoryValues[valueIndex] || '';

              // Send accept to ALL nodes including self
              const acceptPackets = nodeConfigs.map(n =>
                createPacket('accept', packet.to, n.id, currentRound, value)
              );

              setPackets(pkts => [...pkts, ...acceptPackets]);

              return { ...prev, phase: 'confirming' };
            });
          }, 100);
        }
        break;
      }

      case 'accept': {
        // Check if this node already accepted (using ref)
        if (nodeAcceptedRef.current.has(packet.to)) return;

        // Mark as accepted IMMEDIATELY via ref
        nodeAcceptedRef.current.add(packet.to);

        // Update React state for UI
        setNodeStates(prev => prev.map(n =>
          n.id === packet.to ? { ...n, hasAccepted: true } : n
        ));

        addStatusMessage(`${toNode.label} accepted`, 'accepted');

        // Send accepted back (include the value for logging)
        setTimeout(() => {
          if (roundRef.current !== currentRound) return;
          const acceptedPacket = createPacket('accepted', packet.to, packet.from, currentRound, packet.value);
          setPackets(prev => [...prev, acceptedPacket]);
        }, 50);
        break;
      }

      case 'accepted': {
        // Check if consensus already reached
        if (consensusReachedRef.current) return;

        // Check if we already counted this accepted
        if (acceptedsReceivedRef.current.has(packet.from)) return;
        acceptedsReceivedRef.current.add(packet.from);

        // Check for majority (4 accepted from 6 nodes - absolute majority)
        if (acceptedsReceivedRef.current.size >= 4 && !consensusReachedRef.current) {
          consensusReachedRef.current = true;

          addStatusMessage('Consensus!', 'consensus');

          // Get current state synchronously for log entry
          setState(prev => {
            if (prev.winningProposer === null) return prev;

            const winnerConfig = nodeConfigs[prev.winningProposer];
            const valueIndex = prev.valueIndices[winnerConfig.category];
            const categoryValues = consensusValues.find(cv => cv.category === winnerConfig.category)?.values || [];
            const value = categoryValues[valueIndex] || '';

            // Update value index for next round
            const newValueIndices = { ...prev.valueIndices };
            newValueIndices[winnerConfig.category] = (valueIndex + 1) % categoryValues.length;

            return {
              ...prev,
              phase: 'consensus',
              consensusValue: value,
              consensusCategory: winnerConfig.category,
              valueIndices: newValueIndices,
            };
          });

          // Add to log separately (outside setState to avoid duplicates in StrictMode)
          setConsensusLog(prevLog => {
            const newId = `log-${currentRound}`;
            // Prevent duplicate entries
            if (prevLog.some(entry => entry.id === newId)) return prevLog;

            const winnerId = winningProposerIdRef.current;
            if (winnerId === null) return prevLog;

            const winnerConfig = nodeConfigs[winnerId];
            const logEntry: ConsensusLogEntry = {
              id: newId,
              value: packet.value || '',
              category: winnerConfig.category,
              round: currentRound,
            };
            return [logEntry, ...prevLog].slice(0, 8);
          });

          // Schedule next round
          setTimeout(() => {
            if (roundRef.current !== currentRound) return;
            setState(prev => ({ ...prev, phase: 'idle' }));
          }, CONSENSUS_DISPLAY_TIME);
        }
        break;
      }
    }
  }, [addStatusMessage, createPacket]);

  // Animation loop for packet progress
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const targetFps = isMobile ? 45 : 60;
    const frameInterval = 1000 / targetFps;
    let lastFrameTime = 0;

    const animate = (currentTime: number) => {
      // Throttle to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      setPackets(prevPackets => {
        const now = Date.now();
        let hasChanges = false;
        const arrivedThisFrame: Packet[] = [];

        const updatedPackets = prevPackets.map(packet => {
          if (packet.arrived) return packet;

          const elapsed = now - packet.startTime;
          const progress = Math.min(elapsed / packet.duration, 1);

          if (progress >= 1 && !packet.arrived) {
            hasChanges = true;
            arrivedThisFrame.push(packet);
            return { ...packet, progress: 1, arrived: true };
          }

          if (progress !== packet.progress) {
            hasChanges = true;
            return { ...packet, progress };
          }

          return packet;
        });

        // Handle arrivals after state update
        arrivedThisFrame.forEach(packet => {
          setTimeout(() => handlePacketArrival(packet), 0);
        });

        // Clean up old packets
        // Accepted packets stay visible for 800ms after arrival (500ms delay + 300ms fade)
        const activePackets = updatedPackets.filter(p => {
          if (!p.arrived) return true;
          const timeSinceArrival = now - (p.startTime + p.duration);
          if (p.type === 'accepted') {
            return timeSinceArrival < 800; // Keep for fade delay + duration
          }
          return timeSinceArrival < 200;
        });

        return hasChanges || activePackets.length !== updatedPackets.length
          ? activePackets
          : prevPackets;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame((time) => {
      lastFrameTime = time;
      animate(time);
    });
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handlePacketArrival]);

  // Start new round when idle
  useEffect(() => {
    if (state.phase === 'idle') {
      const timer = setTimeout(startNewRound, IDLE_TIME);
      return () => clearTimeout(timer);
    }
  }, [state.phase, startNewRound]);

  return {
    state,
    nodeStates,
    packets,
    statusMessages,
    consensusLog,
  };
}
