import type { StatusMessage } from './paxosTypes';

interface StatusFeedProps {
  messages: StatusMessage[];
}

const typeConfig: Record<StatusMessage['type'], { color: string; icon: string }> = {
  prepare: { color: '#3B82F6', icon: 'P' },
  promise: { color: '#8B5CF6', icon: 'OK' },
  accept: { color: '#14B8A6', icon: 'A' },
  accepted: { color: '#22C55E', icon: '✓' },
  consensus: { color: '#F59E0B', icon: '★' },
  info: { color: '#64748B', icon: '•' },
};

export default function StatusFeed({ messages }: StatusFeedProps) {
  return (
    <div className="hidden md:block absolute top-8 right-8 w-[200px] md:w-[240px]">
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-xl p-3 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
            Network
          </span>
        </div>

        {/* Messages */}
        <div className="space-y-1.5 max-h-[120px] overflow-hidden" role="log" aria-live="polite">
          {messages.slice(0, 4).map((msg, index) => {
            const config = typeConfig[msg.type];
            return (
              <div
                key={msg.id}
                className="flex items-center gap-2 text-xs font-mono transition-opacity duration-300"
                style={{
                  opacity: 1 - index * 0.2,
                }}
              >
                <span
                  className="shrink-0 w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
                  style={{
                    backgroundColor: `${config.color}15`,
                    color: config.color,
                  }}
                >
                  {config.icon}
                </span>
                <span className="text-slate-600 truncate">
                  {msg.text}
                </span>
              </div>
            );
          })}
          {messages.length === 0 && (
            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse" />
              Initializing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
