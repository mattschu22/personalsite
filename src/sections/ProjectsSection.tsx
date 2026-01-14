import ContentPanel from '../components/ContentPanel';
import { projects, minorProjects } from '../data/projects';

export default function ProjectsSection() {
  return (
    <ContentPanel>
      {/* Header */}
      <div className="px-8 md:px-12 lg:px-16 pt-14 pb-10 bg-gradient-to-b from-rose-50/50 to-transparent">
        <p className="animate-fade-up text-[11px] tracking-[0.2em] uppercase text-rose-600 mb-3 font-semibold">Portfolio</p>
        <h2 className="animate-scale-in delay-100 font-display text-display-xl text-ink-900">
          Projects
        </h2>
      </div>

      {/* Content */}
      <div className="px-8 md:px-12 lg:px-16 py-10 space-y-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="card p-6 hover:shadow-xl transition-all duration-300 animate-fade-up group"
            style={{ animationDelay: `${200 + idx * 100}ms` }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-gentle" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Active</span>
                </div>
              </div>
              <span className="text-xs text-ink-400 font-mono bg-ink-100/70 px-3 py-1.5 rounded-lg">
                {project.period}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl text-ink-900 italic mb-2 group-hover:text-rose-700 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-ink-500 mb-5">{project.subtitle}</p>

            {/* Description */}
            <p className="text-sm text-ink-600 leading-relaxed mb-6 pb-6 border-b border-ink-100">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIdx) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full transition-all"
                  style={{
                    color: tagIdx % 3 === 0 ? '#be185d' : tagIdx % 3 === 1 ? '#7c3aed' : '#0891b2',
                    backgroundColor: tagIdx % 3 === 0 ? 'rgb(253 242 248)' : tagIdx % 3 === 1 ? 'rgb(245 243 255)' : 'rgb(236 254 255)',
                    border: `1px solid ${tagIdx % 3 === 0 ? 'rgb(251 207 232)' : tagIdx % 3 === 1 ? 'rgb(221 214 254)' : 'rgb(165 243 252)'}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Minor Projects */}
        {minorProjects.length > 0 && (
          <div className="animate-fade-up" style={{ animationDelay: `${200 + projects.length * 100}ms` }}>
            <h3 className="text-sm font-semibold text-ink-500 uppercase tracking-wider mb-4">Other Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {minorProjects.map((project, idx) => {
                const colors = [
                  { bg: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:border-violet-300 hover:bg-violet-100/50', icon: 'bg-violet-500', tag: 'bg-violet-100 text-violet-700' },
                  { bg: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:border-cyan-300 hover:bg-cyan-100/50', icon: 'bg-cyan-500', tag: 'bg-cyan-100 text-cyan-700' },
                  { bg: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:border-amber-300 hover:bg-amber-100/50', icon: 'bg-amber-500', tag: 'bg-amber-100 text-amber-700' },
                  { bg: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:border-emerald-300 hover:bg-emerald-100/50', icon: 'bg-emerald-500', tag: 'bg-emerald-100 text-emerald-700' },
                ];
                const color = colors[idx % colors.length];

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-xl ${color.bg} border ${color.border} ${color.hover} transition-all`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${color.icon} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-ink-800">{project.title}</h4>
                      <p className="text-xs text-ink-500 mt-0.5 line-clamp-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${color.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-8 md:p-10 animate-fade-up shadow-xl relative overflow-hidden" style={{ animationDelay: `${300 + projects.length * 100}ms` }}>
          {/* Decorative gradient */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.2) 0%, transparent 60%)' }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="font-display text-2xl md:text-3xl text-white italic mb-2">
                See more on GitHub
              </p>
              <p className="text-sm text-ink-400">
                Explore more projects and contributions
              </p>
            </div>
            <a
              href="https://github.com/umMatt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white text-ink-900 font-semibold text-sm hover:bg-rose-50 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View GitHub
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-10" />
    </ContentPanel>
  );
}
