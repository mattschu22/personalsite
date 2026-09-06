import type { SectionBarProps } from '../types';

export default function SectionBar({ id, label, index, isActive, onClick, children }: SectionBarProps) {
  const formattedIndex = String(index).padStart(2, '0');
  const checksum = ['2B55', 'FD91', 'E08B', '5297'][index - 1];

  return (
    <div
      className={`
        section-bar relative h-full overflow-hidden
        ${isActive
          ? 'flex-1 min-w-0'
          : 'w-16 flex-shrink-0 cursor-pointer group'
        }
      `}
      onClick={() => !isActive && onClick(id)}
      role={!isActive ? 'button' : undefined}
      tabIndex={!isActive ? 0 : undefined}
      aria-label={!isActive ? `Open ${label} section` : undefined}
      onKeyDown={(event) => {
        if (!isActive && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick(id);
        }
      }}
    >
      {/* Collapsed state */}
      {!isActive && (
        <>
          {/* Base background */}
          <div className="absolute inset-0 bg-surface-100 border-r border-surface-200" />

          {/* Hover background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-accent-50/60"
          />

          {/* Active indicator line with rounded caps */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-ink-300 transition-colors duration-150 group-hover:bg-accent-600"
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8 px-2">
            {/* Index number */}
            <span
              className="font-mono text-[11px] font-medium text-ink-500 transition-colors duration-150 group-hover:text-accent-600"
            >
              {formattedIndex}
            </span>

            {/* Vertical label */}
            <div className="flex-1 flex items-center justify-center py-6">
              <span
                className="writing-vertical rotate-180 text-xs font-mono font-medium uppercase tracking-[0.16em] text-ink-600 transition-colors duration-150 group-hover:text-accent-600"
                style={{ writingMode: 'vertical-rl' }}
              >
                <span className="group-hover:hidden">{label}</span>
                <span
                  className="hidden group-hover:inline font-semibold"
                >
                  {label}
                </span>
              </span>
            </div>

            <span className="font-mono text-[10px] text-ink-400 tracking-wider group-hover:text-accent-600 transition-colors duration-150">
              {checksum}
            </span>
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
