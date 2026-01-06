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
          {/* Timeline line */}
          <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-teal-300 via-teal-400 to-teal-300 hidden md:block" />

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
      </div>

      {/* Bottom padding */}
      <div className="h-10" />
    </ContentPanel>
  );
}
