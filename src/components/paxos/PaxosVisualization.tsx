import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryToSection, getNodePosition, nodeConfigs } from './paxosData';
import { usePaxosSimulation } from './usePaxosSimulation';
import CenterDisplay from './CenterDisplay';
import PacketDot from './PacketDot';
import PaxosNode from './PaxosNode';
import StatusFeed from './StatusFeed';
import type { NodePosition } from './paxosTypes';
import type { SectionId } from '../../types';

interface PaxosVisualizationProps { onNavigate?: (sectionId: SectionId) => void; }

export default function PaxosVisualization({ onNavigate }: PaxosVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });
  const { state, nodeStates, packets, statusMessages, consensusLog } = usePaxosSimulation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setDimensions({ width: rect.width, height: rect.height });
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const radius = Math.min(dimensions.width * .31, dimensions.height * .34);
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2 + (dimensions.width < 640 ? 18 : 10);
  const positionFor = (nodeId: number): NodePosition => {
    const position = getNodePosition(nodeId, radius);
    return { x: centerX + position.x, y: centerY + position.y };
  };

  const winningConfig = state.consensusCategory ? nodeConfigs.find((node) => node.category === state.consensusCategory) : undefined;
  const handleNodeClick = useCallback((nodeId: number) => {
    const node = nodeConfigs.find((candidate) => candidate.id === nodeId);
    if (node && onNavigate) onNavigate(categoryToSection[node.category]);
  }, [onNavigate]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-surface-50 overflow-hidden">
      <div className="absolute top-0 left-0 p-5 md:p-8 z-20 pointer-events-none">
        <p className="ledger-eyebrow mb-2">01 / Consensus Lab</p>
        <h2 className="font-display text-4xl md:text-6xl text-ink-900">Paxos</h2>
        <p className="text-sm md:text-base text-ink-600 font-mono mt-2">RANDOMIZED / ALL NODES PROPOSE</p>
      </div>

      {dimensions.width > 0 && (
        <svg className="absolute inset-0 pointer-events-none" width={dimensions.width} height={dimensions.height} aria-label="Paxos messages moving between six nodes">
          {packets.map((packet) => <PacketDot key={packet.id} packet={packet} fromPos={positionFor(packet.from)} toPos={positionFor(packet.to)} color="#2B55D8" />)}
        </svg>
      )}

      {nodeConfigs.map((node) => {
        const position = positionFor(node.id);
        const nodeState = nodeStates.find((candidate) => candidate.id === node.id);
        return (
          <PaxosNode
            key={node.id}
            config={node}
            isProposing={state.activeProposers.has(node.id)}
            isWinner={state.winningProposer === node.id}
            hasPromised={nodeState?.hasPromised ?? false}
            hasAccepted={nodeState?.hasAccepted ?? false}
            onClick={() => handleNodeClick(node.id)}
            style={{ left: position.x, top: position.y }}
          />
        );
      })}

      <CenterDisplay
        name="Matt Schumacher"
        consensusValue={state.consensusValue}
        category={winningConfig?.label ?? ''}
        categoryColor="#2B55D8"
        phase={state.phase}
        lastConsensus={consensusLog[0] ?? null}
      />

      <StatusFeed messages={statusMessages} />

      <div className="absolute bottom-5 left-5 right-5 md:left-8 md:right-8 flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm font-mono text-ink-500">
        <span>6 PROPOSERS</span><span>PREPARE → PROMISE</span><span>RETRY / VARIABLE</span><span>QUORUM / 4 OF 6</span>
      </div>
    </div>
  );
}
