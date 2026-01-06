import type { SectionBarProps } from '../types';

const sectionConfig: Record<string, { accent: string; accentBg: string }> = {
  intro: {
    accent: '#3B82F6',
    accentBg: 'rgba(59, 130, 246, 0.06)',
  },
  about: {
    accent: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.06)',
  },
  work: {
    accent: '#14B8A6',
    accentBg: 'rgba(20, 184, 166, 0.06)',
  },
  projects: {
    accent: '#F43F5E',
    accentBg: 'rgba(244, 63, 94, 0.06)',
  },
  contact: {
    accent: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.06)',
  },
};

export default function SectionBar({ id, label, index, isActive, onClick, children }: SectionBarProps) {
  const formattedIndex = String(index).padStart(2, '0');
  const config = sectionConfig[id] || sectionConfig.intro;

  return (
    <div
      className={`
        section-bar relative h-full overflow-hidden
        ${isActive
          ? 'flex-1 min-w-0'
          : 'w-16 md:w-20 flex-shrink-0 cursor-pointer group'
        }
      `}
      onClick={() => !isActive && onClick(id)}
    >
      {/* Collapsed state */}
      {!isActive && (
        <>
          {/* Base background */}
          <div className="absolute inset-0 bg-surface-100 border-r border-ink-200/40" />

          {/* Hover background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: config.accentBg }}
          />

          {/* Active indicator line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-30 group-hover:opacity-100"
            style={{ background: config.accent }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-2">
            {/* Index number */}
            <span
              className="font-mono text-xs font-medium transition-colors duration-300"
              style={{ color: 'rgba(0,0,0,0.25)' }}
            >
              {formattedIndex}
            </span>

            {/* Vertical label */}
            <div className="flex-1 flex items-center justify-center py-6">
              <span
                className="writing-vertical rotate-180 text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  writingMode: 'vertical-rl',
                  color: 'rgba(0,0,0,0.4)',
                }}
              >
                <span className="group-hover:hidden">{label}</span>
                <span
                  className="hidden group-hover:inline font-semibold"
                  style={{ color: config.accent }}
                >
                  {label}
                </span>
              </span>
            </div>

            {/* Dot indicator */}
            <div
              className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{
                background: config.accent,
                opacity: 0.35,
              }}
            />
          </div>
        </>
      )}

      {/* Expanded content */}
      {isActive && (
        <div className="h-full w-full overflow-hidden bg-surface-50">
          {children}
        </div>
      )}
    </div>
  );
}
