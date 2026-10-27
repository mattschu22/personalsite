import type { StatusMessage } from './paxosTypes';

export default function StatusFeed({ messages }: { messages: StatusMessage[] }) {
  return (
    <aside className="paxos-trace hidden md:block absolute top-8 right-8 w-[260px] border border-surface-200 p-4" aria-label="Paxos event log">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-surface-200">
        <span className="text-sm text-ink-700 font-mono">Messages</span>

      </div>
      <div className="space-y-2" role="log" aria-live="off">
        {messages.map((message, index) => (
          <div key={message.id} className="grid grid-cols-[minmax(3ch,auto)_1fr] gap-2 text-xs font-mono" style={{ opacity: 1 - index * .18 }}>
            <span className="text-accent-600 tabular-nums" aria-label={`Message ${message.sequence}`}>#{message.sequence}</span>
            <span className="text-ink-600">{message.text}</span>
          </div>
        ))}
        {messages.length === 0 && <p className="text-xs text-ink-400 font-mono">Awaiting proposal</p>}
      </div>
    </aside>
  );
}
