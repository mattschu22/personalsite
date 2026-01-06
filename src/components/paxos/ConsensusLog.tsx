import type { ConsensusLogEntry } from './paxosTypes';
import { nodeConfigs } from './paxosData';

interface ConsensusLogProps {
  entries: ConsensusLogEntry[];
}

export default function ConsensusLog({ entries }: ConsensusLogProps) {
  const getCategoryColor = (category: string): string => {
    const node = nodeConfigs.find((n) => n.category === category);
    return node?.color || '#6B7280';
  };

  const getCategoryLabel = (category: string): string => {
    const node = nodeConfigs.find((n) => n.category === category);
    return node?.label || category;
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 px-4 md:px-8">
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <span className="shrink-0 text-xs text-slate-400 font-medium">
          History:
        </span>
        {entries.length === 0 ? (
          <span className="text-xs text-slate-300 italic">
            Waiting for first consensus...
          </span>
        ) : (
          entries.map((entry, index) => {
            const color = getCategoryColor(entry.category);
            const isLatest = index === 0;

            return (
              <div
                key={entry.id}
                className={`
                  shrink-0 flex items-center gap-2 px-3 py-2
                  w-[180px] md:w-[220px] h-[44px]
                  bg-white/90 backdrop-blur-sm border rounded-lg shadow-sm
                  transition-all duration-300 overflow-hidden
                  ${isLatest ? 'ring-1 ring-offset-1' : 'border-slate-200/60'}
                `}
                style={{
                  borderColor: isLatest ? color : undefined,
                  ['--tw-ring-color' as string]: isLatest ? `${color}40` : undefined,
                  opacity: Math.max(0.4, 1 - index * 0.1),
                }}
              >
                {/* Category indicator */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />

                {/* Content with fade effect */}
                <div className="flex-1 min-w-0 overflow-hidden relative">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider block"
                    style={{ color }}
                  >
                    {getCategoryLabel(entry.category)}
                  </span>
                  <div className="relative">
                    <span className="text-xs text-slate-500 block whitespace-nowrap">
                      {entry.value}
                    </span>
                    {/* Fade overlay */}
                    <div
                      className="absolute top-0 right-0 h-full w-8 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9))',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
