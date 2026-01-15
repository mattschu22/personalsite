import type { ContentPanelProps } from '../types';

export default function ContentPanel({ children, className = '' }: ContentPanelProps) {
  return (
    <div
      data-content-panel="true"
      className={`h-full min-h-screen w-full overflow-y-auto overflow-x-hidden ${className}`}
    >
      <div className="min-h-full">
        {children}
      </div>
    </div>
  );
}
