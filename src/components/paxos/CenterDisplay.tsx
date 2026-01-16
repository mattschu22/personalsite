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
    <div className="absolute left-1/2 top-[42%] md:top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10 pointer-events-none">
      {/* Name */}
      <h1 className="font-display text-xl md:text-4xl lg:text-5xl text-slate-800 font-semibold tracking-tight mb-2 md:mb-4">
        {name}
      </h1>

      {/* Divider */}
      <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-3 md:mb-6" />

      {/* Consensus value display */}
      <div className="max-w-[200px] md:max-w-[380px] lg:max-w-[480px]">
        {!hasValue ? (
          /* Initializing state */
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs md:text-sm font-medium">Initializing consensus</span>
          </div>
        ) : (
          <>
            {/* Category badge */}
            <div className="mb-2 md:mb-3">
              <span
                className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${displayColor}15`,
                  color: displayColor,
                  border: `1.5px solid ${displayColor}40`,
                }}
              >
                <span
                  className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${showCurrentConsensus ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: displayColor }}
                />
                {displayCategory}
              </span>
            </div>

            {/* Consensus value - natural language */}
            <blockquote className="relative">
              <span className="absolute -left-1 md:-left-2 -top-1 md:-top-2 text-2xl md:text-4xl text-slate-200 font-serif">"</span>
              <p className="text-xs md:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed italic px-2 md:px-4">
                {displayValue}
              </p>
              <span className="absolute -right-1 md:-right-2 -bottom-2 md:-bottom-4 text-2xl md:text-4xl text-slate-200 font-serif">"</span>
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
}
