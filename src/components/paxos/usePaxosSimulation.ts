import { useEffect, useState } from 'react';
import { consensusValues, nodeConfigs } from './paxosData';
import type { CategoryType, ConsensusLogEntry, NodeState, Packet, PacketType, PaxosState, StatusMessage } from './paxosTypes';

const valueIndices: Record<CategoryType, number> = {
  education: 0,
  experience: 0,
  skills: 0,
  projects: 0,
  achievements: 0,
  languages: 0,
};

const initialState = (): PaxosState => ({
  phase: 'idle',
  activeProposers: new Set(),
  winningProposer: null,
  consensusValue: null,
  consensusCategory: null,
  roundNumber: 0,
  valueIndices,
});

const initialNodes = (): NodeState[] => nodeConfigs.map((node) => ({
  id: node.id,
  highestPromised: 0,
  hasPromised: false,
  promisedTo: null,
  hasAccepted: false,
  proposalNumber: 0,
  proposedValue: '',
}));

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export interface UsePaxosSimulationReturn {
  state: PaxosState;
  nodeStates: NodeState[];
  packets: Packet[];
  statusMessages: StatusMessage[];
  consensusLog: ConsensusLogEntry[];
}

export function usePaxosSimulation(): UsePaxosSimulationReturn {
  const [cycle, setCycle] = useState(0);
  const [state, setState] = useState<PaxosState>(initialState);
  const [nodeStates, setNodeStates] = useState<NodeState[]>(initialNodes());
  const [packets, setPackets] = useState<Packet[]>([]);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [consensusLog, setConsensusLog] = useState<ConsensusLogEntry[]>([]);

  useEffect(() => {
    const timers: number[] = [];
    const nodeIds = nodeConfigs.map((node) => node.id);
    const ballotRanks = shuffled(nodeIds.map((_, index) => index + 1));
    const baseBallot = (cycle + 1) * 100;
    const ballots = Object.fromEntries(nodeIds.map((nodeId, index) => [nodeId, baseBallot + ballotRanks[index]])) as Record<number, number>;
    const proposalDelays = Object.fromEntries(nodeIds.map((nodeId) => [nodeId, 260 + Math.floor(Math.random() * 920)])) as Record<number, number>;
    const proposalValues = Object.fromEntries(nodeConfigs.map((node) => {
      const values = consensusValues.find((entry) => entry.category === node.category)?.values ?? [''];
      return [node.id, values[Math.floor(Math.random() * values.length)] ?? ''];
    })) as Record<number, string>;
    const winnerId = nodeIds.reduce((winner, candidate) => ballots[candidate] > ballots[winner] ? candidate : winner, nodeIds[0]);
    const winner = nodeConfigs[winnerId];
    const winnerValue = proposalValues[winnerId];
    const needsRetry = Math.random() < 0.58;
    const retryBallot = baseBallot + 20 + Math.floor(Math.random() * 20);
    const quorum = shuffled(nodeIds).slice(0, 4);
    const acceptedIds = shuffled(nodeIds).slice(0, 4 + Math.floor(Math.random() * 3));
    const preliminaryLeaders = shuffled(nodeIds).slice(0, 3);
    const preliminaryOwners = needsRetry
      ? Object.fromEntries(shuffled(nodeIds).map((nodeId, index) => [nodeId, preliminaryLeaders[index % preliminaryLeaders.length]])) as Record<number, number>
      : Object.fromEntries(nodeIds.map((nodeId) => [nodeId, quorum.includes(nodeId) ? winnerId : shuffled(nodeIds.filter((id) => id !== winnerId))[0]])) as Record<number, number>;

    const later = (delay: number, action: () => void) => {
      timers.push(window.setTimeout(action, delay));
    };

    const addStatus = (step: number, text: string, type: StatusMessage['type']) => {
      setStatusMessages((messages) => [{ id: `${cycle}-${step}-${Math.random()}`, text, type, timestamp: step }, ...messages].slice(0, 4));
    };

    const send = (step: number, type: PacketType, from: number, targets: number[], proposalNumber: number, packetValue?: string) => {
      const startTime = Date.now();
      setPackets((current) => [
        ...current,
        ...targets.map((to, index) => ({
          id: `${cycle}-${step}-${type}-${from}-${to}-${index}-${Math.random()}`,
          type,
          from,
          to,
          progress: 0,
          startTime,
          duration: 420 + Math.floor(Math.random() * 620),
          arrived: false,
          value: packetValue,
          proposalNumber,
        })),
      ]);
    };

    setState({ ...initialState(), roundNumber: cycle + 1 });
    setNodeStates(initialNodes().map((node) => ({
      ...node,
      proposalNumber: ballots[node.id],
      proposedValue: proposalValues[node.id],
    })));
    setPackets([]);
    setStatusMessages([]);

    nodeIds.forEach((nodeId) => {
      later(proposalDelays[nodeId], () => {
        setState((current) => ({
          ...current,
          phase: 'proposing',
          activeProposers: new Set([...current.activeProposers, nodeId]),
        }));
        send(nodeId + 1, 'prepare', nodeId, nodeIds, ballots[nodeId]);
        addStatus(nodeId + 1, `${nodeConfigs[nodeId].label} proposes ${ballots[nodeId]}`, 'prepare');
      });
    });

    later(1850, () => {
      setState((current) => ({ ...current, phase: 'promising' }));
      setNodeStates((nodes) => nodes.map((node) => {
        const owner = preliminaryOwners[node.id];
        return { ...node, highestPromised: ballots[owner], hasPromised: true, promisedTo: owner };
      }));
      nodeIds.forEach((from) => {
        const owner = preliminaryOwners[from];
        send(10 + from, 'promise', from, [owner], ballots[owner]);
      });
      addStatus(10, needsRetry ? 'Concurrent ballots split promises' : 'Highest ballot reaches majority', needsRetry ? 'info' : 'promise');
    });

    const quorumAt = needsRetry ? 3650 : 2850;
    if (needsRetry) {
      later(2700, () => {
        setState((current) => ({ ...current, phase: 'proposing', activeProposers: new Set([winnerId]) }));
        setNodeStates((nodes) => nodes.map((node) => node.id === winnerId ? { ...node, proposalNumber: retryBallot } : node));
        send(20, 'prepare', winnerId, nodeIds, retryBallot);
        addStatus(20, `${winner.label} re-proposes ${retryBallot}`, 'prepare');
      });
    }

    later(quorumAt, () => {
      const winningBallot = needsRetry ? retryBallot : ballots[winnerId];
      setState((current) => ({ ...current, phase: 'accepting', activeProposers: new Set([winnerId]), winningProposer: winnerId }));
      setNodeStates((nodes) => nodes.map((node) => quorum.includes(node.id)
        ? { ...node, highestPromised: winningBallot, hasPromised: true, promisedTo: winnerId }
        : node));
      quorum.forEach((from) => send(30 + from, 'promise', from, [winnerId], winningBallot));
      addStatus(30, `${quorum.length}/6 promises select ${winner.label}`, 'promise');
    });

    later(quorumAt + 900, () => {
      const winningBallot = needsRetry ? retryBallot : ballots[winnerId];
      setState((current) => ({ ...current, phase: 'confirming' }));
      send(40, 'accept', winnerId, nodeIds, winningBallot, winnerValue);
      addStatus(40, `${winner.label} broadcasts ACCEPT`, 'accept');
    });

    later(quorumAt + 1900, () => {
      const winningBallot = needsRetry ? retryBallot : ballots[winnerId];
      setNodeStates((nodes) => nodes.map((node) => acceptedIds.includes(node.id) ? { ...node, hasAccepted: true } : node));
      acceptedIds.forEach((from) => send(50 + from, 'accepted', from, [winnerId], winningBallot, winnerValue));
      addStatus(50, `${acceptedIds.length}/6 acceptances returned`, 'accepted');
    });

    later(quorumAt + 2900, () => {
      setState((current) => ({ ...current, phase: 'consensus', consensusValue: winnerValue, consensusCategory: winner.category }));
      setConsensusLog((log) => [{ id: `log-${cycle}`, value: winnerValue, category: winner.category, round: cycle + 1 }, ...log].slice(0, 5));
      addStatus(60, 'Value chosen', 'consensus');
    });

    later(quorumAt + 5600, () => setCycle((current) => current + 1));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [cycle]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      const now = Date.now();
      setPackets((current) => {
        if (current.length === 0) return current;
        return current
          .map((packet) => {
            const progress = Math.min((now - packet.startTime) / packet.duration, 1);
            return progress === packet.progress ? packet : { ...packet, progress, arrived: progress >= 1 };
          })
          .filter((packet) => now - (packet.startTime + packet.duration) < 450);
      });
    }, 32);
    return () => window.clearInterval(interval);
  }, []);

  return { state, nodeStates, packets, statusMessages, consensusLog };
}
