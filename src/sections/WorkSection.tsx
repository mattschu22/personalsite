import ContentPanel from '../components/ContentPanel';
import { experience } from '../data/experience';

export default function WorkSection() {
  return (
    <ContentPanel>
      {/* Header */}
      <div className="px-8 md:px-12 lg:px-16 pt-14 pb-10 bg-gradient-to-b from-teal-50/50 to-transparent">
        <p className="animate-fade-up text-[11px] tracking-[0.2em] uppercase text-teal-600 mb-3 font-semibold">Career</p>
        <h2 className="animate-scale-in delay-100 font-display text-display-xl text-ink-900">
          Experience
        </h2>
      </div>

      {/* Content */}
      <div className="px-8 md:px-12 lg:px-16 py-10">
        {/* Stats - colorful row */}
        <div className="animate-fade-up delay-200 grid grid-cols-3 gap-4 mb-12">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20">
            <p className="font-display text-4xl md:text-5xl">7+</p>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-2 text-teal-100 font-medium">Years</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/20">
            <p className="font-display text-4xl md:text-5xl">4</p>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-2 text-violet-100 font-medium">Companies</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20">
            <p className="font-display text-4xl md:text-5xl">170+</p>
            <p className="text-[10px] tracking-[0.2em] uppercase mt-2 text-amber-100 font-medium">Hospitals</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - extends full height with rounded end */}
          <div className="absolute left-[18px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-teal-400 to-teal-200 hidden md:block rounded-b-full" />

          {/* Timeline end cap */}
          <div className="absolute left-[14px] bottom-0 w-2.5 h-2.5 rounded-full bg-teal-200 hidden md:block" />

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <div
                key={idx}
                className="animate-fade-up relative md:pl-14"
                style={{ animationDelay: `${300 + idx * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 w-9 h-9 rounded-full bg-white border-[3px] border-teal-500 hidden md:flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                </div>

                <div className="card p-6 hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-ink-900 italic mb-1">
                        {job.company}
                      </h3>
                      <p className="text-base text-teal-600 font-medium">{job.role}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-ink-500 bg-ink-100/70 px-4 py-2 rounded-lg whitespace-nowrap font-medium">
                      <svg className="w-4 h-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {job.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {job.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                        <span className="text-sm text-ink-600 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 p-8 md:p-10 animate-fade-up shadow-xl relative overflow-hidden" style={{ animationDelay: `${300 + experience.length * 100}ms` }}>
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 60%)' }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="font-display text-2xl md:text-3xl text-white italic mb-2">
                Want the full picture?
              </p>
              <p className="text-sm text-teal-100">
                Download my resume or connect on LinkedIn
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <a
                href="https://linkedin.com/in/ummatt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-10" />
    </ContentPanel>
  );
}
