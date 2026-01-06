import type { PaxosPhase, ConsensusLogEntry } from './paxosTypes';
import { nodeConfigs } from './paxosData';

interface CenterDisplayProps {
  name: string;
  consensusValue: string | null;
  category: string;
  categoryColor: string;
  phase: PaxosPhase;
  lastConsensus: ConsensusLogEntry | null;
}

export default function CenterDisplay({
  name,
  consensusValue,
  category,
  categoryColor,
  phase,
  lastConsensus,
}: CenterDisplayProps) {
  const showCurrentConsensus = phase === 'consensus' && consensusValue;

  // Get color for last consensus category
  const getLastCategoryColor = (): string => {
    if (!lastConsensus) return '#64748B';
    const node = nodeConfigs.find((n) => n.category === lastConsensus.category);
    return node?.color || '#64748B';
  };

  const getLastCategoryLabel = (): string => {
    if (!lastConsensus) return '';
    const node = nodeConfigs.find((n) => n.category === lastConsensus.category);
    return node?.label || '';
  };

  // Determine what to display
  const displayValue = showCurrentConsensus ? consensusValue : lastConsensus?.value || null;
  const displayCategory = showCurrentConsensus ? category : getLastCategoryLabel();
  const displayColor = showCurrentConsensus ? categoryColor : getLastCategoryColor();
  const hasValue = displayValue !== null;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 pointer-events-none">
      {/* Name */}
      <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-slate-800 font-semibold tracking-tight mb-2">
        {name}
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-slate-500 mb-4">
        Distributed Consensus Demo
      </p>

      {/* Divider */}
      <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6" />

      {/* Consensus value display */}
      <div
        className={`
          max-w-[280px] md:max-w-[380px] lg:max-w-[480px]
          transition-all duration-500 ease-out
          ${hasValue ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}
        `}
      >
        {hasValue && (
          <>
            {/* Category badge */}
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${displayColor}15`,
                  color: displayColor,
                  border: `1.5px solid ${displayColor}40`,
                }}
              >
                <span
                  className={`w-2 h-2 rounded-full ${showCurrentConsensus ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: displayColor }}
                />
                {displayCategory}
              </span>
            </div>

            {/* Consensus value - natural language */}
            <blockquote className="relative">
              <span className="absolute -left-2 -top-2 text-4xl text-slate-200 font-serif">"</span>
              <p className="text-base md:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed italic px-4">
                {displayValue}
              </p>
              <span className="absolute -right-2 -bottom-4 text-4xl text-slate-200 font-serif">"</span>
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
}
