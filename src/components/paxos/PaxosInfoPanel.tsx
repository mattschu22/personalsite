// Icons as simple SVG components
const ServerIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BoltIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const ShieldIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

export default function PaxosInfoPanel() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-slate-200">
      <div className="px-6 py-4 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-xs font-semibold text-slate-700 mb-3">
          What is Paxos? <span className="font-normal text-slate-400">— Understanding the visualization above</span>
        </h2>

        {/* Main content grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">

          {/* The Problem */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-50 rounded">
                <ServerIcon className="w-3.5 h-3.5 text-red-500" />
              </div>
              <h3 className="text-xs font-semibold text-slate-800">The Problem</h3>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Distributed servers must agree on shared data, but networks are unreliable—messages get delayed and servers crash.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full bg-slate-100 border border-white flex items-center justify-center"
                  >
                    <ServerIcon className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-400">How do they agree?</span>
            </div>
          </div>

          {/* The Solution */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-emerald-50 rounded">
                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <h3 className="text-xs font-semibold text-slate-800">The Solution</h3>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Paxos uses <span className="font-medium">majority voting</span>. A value is only committed when more than half agree. Any two majorities overlap.
            </p>
            <div className="bg-slate-50 rounded px-2 py-1.5">
              <div className="flex items-center justify-center gap-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                      i < 4
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-slate-500 text-center mt-1">
                4 of 6 nodes = majority consensus
              </p>
            </div>
          </div>

          {/* The Protocol */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-50 rounded">
                <BoltIcon className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <h3 className="text-xs font-semibold text-slate-800">The Protocol</h3>
            </div>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200" />
              <div className="space-y-1.5">
                {[
                  { phase: "Prepare", desc: "Proposer requests promises" },
                  { phase: "Promise", desc: "Nodes pledge to proposer" },
                  { phase: "Accept", desc: "Leader broadcasts value" },
                  { phase: "Consensus", desc: "Majority commits value" },
                ].map((step, i) => (
                  <div key={step.phase} className="flex items-center gap-1.5 relative">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[8px] font-bold border border-blue-200 z-10 bg-white">
                      {i + 1}
                    </div>
                    <span className="text-[10px] font-medium text-slate-700">{step.phase}</span>
                    <span className="text-[10px] text-slate-400">· {step.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-amber-50 rounded">
                <ShieldIcon className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <h3 className="text-xs font-semibold text-slate-800">Why It Matters</h3>
            </div>
            <div className="space-y-1">
              {[
                { name: "Google Spanner", desc: "Global SQL", icon: (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )},
                { name: "ZooKeeper", desc: "Coordination", icon: (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                )},
                { name: "etcd", desc: "Kubernetes", icon: (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                )},
                { name: "CockroachDB", desc: "Distributed SQL", icon: (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                )},
                { name: "TiDB", desc: "NewSQL", icon: (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                )},
              ].map((app) => (
                <div key={app.name} className="flex items-center gap-1.5 text-slate-600">
                  <span className="text-slate-400">{app.icon}</span>
                  <span className="text-[10px] font-medium">{app.name}</span>
                  <span className="text-[9px] text-slate-400">· {app.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
