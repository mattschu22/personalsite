import { useRef, useEffect, useState, useCallback } from 'react';
import { usePaxosSimulation } from './usePaxosSimulation';
import { nodeConfigs, getNodePosition, categoryToSection } from './paxosData';
import PaxosNode from './PaxosNode';
import CenterDisplay from './CenterDisplay';
import PacketDot from './PacketDot';
import StatusFeed from './StatusFeed';
import PaxosInfoPanel from './PaxosInfoPanel';
import type { NodePosition } from './paxosTypes';
import type { SectionId } from '../../types';

interface PaxosVisualizationProps {
  onNavigate?: (sectionId: SectionId) => void;
}

export default function PaxosVisualization({ onNavigate }: PaxosVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600
  });
  const { state, nodeStates, packets, statusMessages, consensusLog } = usePaxosSimulation();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    updateDimensions();
    const timeoutId = setTimeout(updateDimensions, 50);
    const timeoutId2 = setTimeout(updateDimensions, 200);

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateDimensions);

    const handleVisibilityChange = () => {
      setTimeout(updateDimensions, 50);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);


  const getRadius = () => {
    if (dimensions.width < 640) return 140;
    if (dimensions.width < 1024) return 260;
    return 340;
  };

  const radius = getRadius();
  const centerX = dimensions.width / 2;
  // Adjust vertical center: mobile pushed up to avoid bottom bar, desktop pushed up for header
  const getCenterY = () => {
    if (dimensions.width < 640) return dimensions.height / 2 - 40;
    return dimensions.height / 2 - 60;
  };
  const centerY = getCenterY();

  const getAbsolutePosition = (nodeIndex: number): NodePosition => {
    const relativePos = getNodePosition(nodeIndex, radius);
    return {
      x: centerX + relativePos.x,
      y: centerY + relativePos.y,
    };
  };

  // Get color for the current winning category or a neutral color
  const getCurrentCategoryColor = (): string => {
    if (state.consensusCategory) {
      const node = nodeConfigs.find((n) => n.category === state.consensusCategory);
      return node?.color || '#3B82F6';
    }
    // During voting, show a neutral color
    return '#64748B';
  };

  const getCurrentCategoryLabel = (): string => {
    if (state.consensusCategory) {
      const node = nodeConfigs.find((n) => n.category === state.consensusCategory);
      return node?.label || '';
    }
    return '';
  };

  const handleNodeClick = useCallback((nodeId: number) => {
    if (!onNavigate) return;
    const node = nodeConfigs.find(n => n.id === nodeId);
    if (node) {
      const sectionId = categoryToSection[node.category];
      onNavigate(sectionId);
    }
  }, [onNavigate]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 px-4 md:px-12 lg:px-16 pt-3 md:pt-14 pb-2 md:pb-10 z-20 pointer-events-none max-w-[200px] md:max-w-md">
        <p className="text-[9px] md:text-[11px] tracking-[0.2em] uppercase text-blue-600 mb-1 md:mb-3 font-semibold">Welcome</p>
        <h2 className="font-display text-lg md:text-5xl lg:text-6xl text-slate-800 font-semibold mb-0.5 md:mb-2">
          Intro
        </h2>
        <p className="text-[10px] md:text-sm text-slate-500">
          Distributed Consensus Demo
        </p>
      </div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Radial gradient highlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 45%, ${getCurrentCategoryColor()}12 0%, transparent 70%)`,
        }}
      />

      {/* SVG layer for connections and packets */}
      {dimensions.width > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={dimensions.width}
          height={dimensions.height}
        >
          {/* Animated packets */}
          {packets.map((packet) => {
            const fromPos = getAbsolutePosition(packet.from);
            const toPos = getAbsolutePosition(packet.to);
            const color = nodeConfigs[packet.from]?.color || '#3B82F6';

            return (
              <PacketDot
                key={packet.id}
                packet={packet}
                fromPos={fromPos}
                toPos={toPos}
                color={color}
              />
            );
          })}
        </svg>
      )}

      {/* Nodes */}
      {nodeConfigs.map((node) => {
        const pos = getAbsolutePosition(node.id);
        const nodeState = nodeStates.find(n => n.id === node.id);
        const isProposing = state.activeProposers.has(node.id);
        const isWinner = state.winningProposer === node.id;
        const hasPromised = nodeState?.hasPromised || false;
        const hasAccepted = nodeState?.hasAccepted || false;

        return (
          <PaxosNode
            key={node.id}
            config={node}
            isProposing={isProposing}
            isWinner={isWinner}
            hasPromised={hasPromised}
            hasAccepted={hasAccepted}
            onClick={() => handleNodeClick(node.id)}
            style={{
              left: pos.x,
              top: pos.y,
            }}
          />
        );
      })}

      {/* Center display */}
      <CenterDisplay
        name="Matt Schumacher"
        consensusValue={state.consensusValue}
        category={getCurrentCategoryLabel()}
        categoryColor={getCurrentCategoryColor()}
        phase={state.phase}
        lastConsensus={consensusLog[0] || null}
      />

      {/* Status feed */}
      <StatusFeed messages={statusMessages} />

      {/* Paxos info panel */}
      <PaxosInfoPanel />
    </div>
  );
}
