import type { StatusMessage } from './paxosTypes';

export default function StatusFeed({ messages }: { messages: StatusMessage[] }) {
  return (
    <aside className="hidden md:block absolute top-8 right-8 w-[300px] bg-ink-900 border border-ink-700 p-5" aria-label="Paxos event log">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-ink-700">
        <span className="text-sm text-white font-mono">MESSAGE TRACE</span>
        <span className="text-xs text-[#E1FD91] font-mono">LIVE</span>
      </div>
      <div className="space-y-2" role="log" aria-live="polite">
        {messages.map((message, index) => (
          <div key={message.id} className="grid grid-cols-[32px_1fr] gap-2 text-xs font-mono" style={{ opacity: 1 - index * .18 }}>
            <span className="text-[#E1FD91]">{String(message.timestamp).padStart(2, '0')}</span>
            <span className="text-ink-300">{message.text}</span>
          </div>
        ))}
        {messages.length === 0 && <p className="text-xs text-ink-400 font-mono">Awaiting proposal</p>}
      </div>
    </aside>
  );
}
