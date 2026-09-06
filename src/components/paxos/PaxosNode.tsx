import type { NodeConfig } from './paxosTypes';

interface PaxosNodeProps {
  config: NodeConfig;
  isProposing: boolean;
  isWinner: boolean;
  hasPromised: boolean;
  hasAccepted: boolean;
  onClick?: () => void;
  style: React.CSSProperties;
}

export default function PaxosNode({ config, isProposing, isWinner, hasPromised, hasAccepted, onClick, style }: PaxosNodeProps) {
  const state = hasAccepted ? 'accepted' : isWinner ? 'leader' : hasPromised ? 'promised' : isProposing ? 'prepare' : 'idle';
  const active = state !== 'idle';
  const background = hasAccepted ? '#E1FD91' : isWinner ? config.color : '#FAF9F5';
  const foreground = hasAccepted ? '#171A1F' : isWinner ? '#FFFFFF' : config.color;

  return (
    <button
      type="button"
      className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 z-10 bg-transparent border-0 cursor-pointer"
      style={style}
      onClick={onClick}
      aria-label={`${config.label} node, ${state}`}
    >
      <span
        className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono text-base md:text-lg font-semibold"
        style={{ background, color: foreground, border: `2px solid ${active ? config.color : '#9C9FA3'}` }}
      >
        {hasAccepted ? '✓' : config.id}
      </span>
      <span className="text-xs md:text-sm font-mono font-medium uppercase tracking-[0.05em] text-ink-600">{config.label}</span>
      <small className="text-[10px] md:text-xs font-mono uppercase text-ink-400">{state}</small>
    </button>
  );
}
