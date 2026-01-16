import ContentPanel from '../components/ContentPanel';
import { education, skills, patents, publications } from '../data/education';

export default function AboutSection() {
  return (
    <ContentPanel>
      {/* Header */}
      <div className="px-8 md:px-12 lg:px-16 pt-14 pb-10 bg-gradient-to-b from-violet-50/50 to-transparent">
        <p className="animate-fade-up text-[11px] tracking-[0.2em] uppercase text-violet-600 mb-3 font-semibold">Background</p>
        <h2 className="animate-scale-in delay-100 font-display text-display-xl text-ink-900">
          About
        </h2>
      </div>

      {/* Content */}
      <div className="px-8 md:px-12 lg:px-16 py-10 space-y-12">
        {/* Profile / Headshot */}
        <section className="animate-fade-up delay-150">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 border-2 border-violet-200 overflow-hidden shadow-lg">
                <img src="/headshot.jpg" alt="Matt Schumacher" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Bio text */}
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl text-ink-900 italic mb-3">
                Matt Schumacher
              </h3>
              <p className="text-sm text-ink-600 leading-relaxed mb-4">
                Software engineer passionate about distributed systems, performant code, and AI/ML.
                Currently pursuing my Master's at the University of Michigan while building tools
                that push the boundaries of what's possible with modern computing.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                  Distributed Systems
                </span>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  AI/ML
                </span>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Performance
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="animate-fade-up delay-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-600">Education</h3>
          </div>

          <div className="card p-6 mb-4 bg-gradient-to-br from-amber-50 to-orange-50/30 border-amber-200/50">
            <p className="font-display text-2xl md:text-3xl text-ink-900 italic mb-1">
              {education.school}
            </p>
            <p className="text-sm text-amber-700 font-bold">Go Blue!</p>
          </div>

          <div className="space-y-3">
            {education.degrees.map((degree, idx) => (
              <div
                key={idx}
                className="card p-5 animate-fade-up hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${300 + idx * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h4 className="text-base font-semibold text-ink-800">{degree.title}</h4>
                    <p className="text-sm text-ink-500">{degree.status}</p>
                  </div>
                  {degree.gpa && (
                    <span className="font-mono text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-lg shadow-sm">
                      {degree.gpa}
                    </span>
                  )}
                </div>
                {degree.honors && degree.honors.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-ink-100">
                    {degree.honors.map((honor) => (
                      <span key={honor} className="text-xs font-medium px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                        {honor}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="animate-fade-up delay-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-600">Skills</h3>
          </div>

          <div className="card p-6">
            {/* Languages */}
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.15em] uppercase text-blue-600 mb-4 font-bold">Languages</p>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang) => (
                  <span
                    key={lang}
                    className="font-mono text-sm font-medium text-ink-700 px-4 py-2 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-violet-600 mb-4 font-bold">Expertise</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {skills.expertise.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-violet-50/50 transition-colors group"
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-500 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-ink-600 group-hover:text-ink-800 transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Publications & Patents */}
        <section className="animate-fade-up delay-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-600">Publications & Patents</h3>
          </div>

          <div className="space-y-3">
            {patents.map((patent, idx) => (
              <div key={idx} className="card p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase text-white bg-ink-800 px-2.5 py-1 rounded">
                    {patent.type}
                  </span>
                  <span className="text-xs text-ink-400 font-mono">#{patent.number}</span>
                </div>
                <p className="font-display text-base text-ink-700 italic leading-relaxed">
                  "{patent.title}"
                </p>
              </div>
            ))}

            {publications.map((pub, idx) => (
              <div key={idx} className="card p-5 hover:shadow-lg transition-shadow">
                <span className="text-[10px] font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-500 px-2.5 py-1 rounded mb-3 inline-block">
                  {pub.id}
                </span>
                <p className="font-display text-base text-ink-700 italic leading-relaxed">
                  "{pub.title}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom padding */}
      <div className="h-10" />
    </ContentPanel>
  );
}
