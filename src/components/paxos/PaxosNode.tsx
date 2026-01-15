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

export default function PaxosNode({
  config,
  isProposing,
  isWinner,
  hasPromised,
  hasAccepted,
  onClick,
  style,
}: PaxosNodeProps) {
  const getNodeState = () => {
    // Winner takes precedence - leader keeps solid fill
    if (isWinner) return 'winner';
    if (hasAccepted) return 'accepted';
    if (hasPromised) return 'promised';
    if (isProposing) return 'proposing';
    return 'idle';
  };

  const nodeState = getNodeState();

  const getBackgroundColor = () => {
    if (nodeState === 'winner') return config.color;
    if (nodeState === 'accepted') return '#22C55E'; // Green for accepted (non-leader)
    if (nodeState === 'proposing') return `${config.color}20`;
    return 'white';
  };

  const getBorderColor = () => {
    if (nodeState === 'accepted') return '#22C55E';
    return config.color;
  };

  const getBoxShadow = () => {
    if (nodeState === 'winner') {
      return `0 0 24px 6px ${config.color}40, 0 4px 12px rgba(0,0,0,0.1)`;
    }
    if (nodeState === 'accepted') {
      return `0 0 16px 4px rgba(34, 197, 94, 0.35), 0 2px 8px rgba(0,0,0,0.08)`;
    }
    if (nodeState === 'promised' || nodeState === 'proposing') {
      return `0 0 12px 3px ${config.color}25, 0 2px 8px rgba(0,0,0,0.06)`;
    }
    return `0 2px 8px rgba(0,0,0,0.06)`;
  };

  return (
    <div
      className={`absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-110' : ''}`}
      style={{
        ...style,
        transform: `translate(-50%, -50%) ${nodeState === 'winner' ? 'scale(1.1)' : 'scale(1)'}`,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {/* Node circle - smaller */}
      <div
        className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: getBackgroundColor(),
          border: `2px solid ${getBorderColor()}`,
          boxShadow: getBoxShadow(),
        }}
      >
        {/* Proposing pulse animation */}
        {nodeState === 'proposing' && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: config.color }}
          />
        )}

        {/* Checkmark for accepted (non-leader), ID for others */}
        {nodeState === 'accepted' ? (
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span
            className="font-mono text-sm md:text-base lg:text-lg font-bold relative z-10"
            style={{
              color: nodeState === 'winner' ? 'white' : config.color,
            }}
          >
            {config.id}
          </span>
        )}
      </div>

      {/* Node label - simpler */}
      <span
        className="text-[10px] md:text-xs font-medium tracking-wide transition-colors duration-300"
        style={{
          color: nodeState === 'idle' ? 'rgb(100, 116, 139)' : config.color,
        }}
      >
        {config.label}
      </span>
    </div>
  );
}
