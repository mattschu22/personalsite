import ContentPanel from '../components/ContentPanel';

export default function IntroSection() {
  return (
    <ContentPanel className="flex items-center justify-center">
      <div className="w-full min-h-full flex items-center justify-center relative px-8 md:px-16 lg:px-24 py-12">
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
          }}
        />

        {/* Main content area */}
        <div className="max-w-3xl w-full relative z-10">
            {/* Status badge */}
            <div className="animate-fade-up mb-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-ink-900 text-white shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-gentle" />
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium">
                  Available May 2026
                </span>
              </div>
            </div>

            {/* Name - dramatic typography */}
            <div className="animate-scale-in delay-100 mb-8">
              <h1 className="font-display text-display-hero text-ink-900 leading-[0.85]">
                Matt
              </h1>
              <h1 className="font-display text-display-hero leading-[0.85] mt-1">
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                  Schumacher
                </span>
              </h1>
            </div>

            {/* Accent line */}
            <div className="animate-line-grow delay-300 h-1 w-32 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-8" />

            {/* Tagline */}
            <p className="animate-fade-up delay-400 text-xl md:text-2xl text-ink-600 max-w-lg mb-12 leading-relaxed">
              Building systems that scale—from kernels to clouds.
            </p>

            {/* Role tags */}
            <div className="animate-fade-up delay-500 flex flex-wrap gap-3 mb-12">
              <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Software Engineer
              </span>
              <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-violet-50 text-violet-700 border border-violet-200">
                Systems Developer
              </span>
              <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200">
                ML Engineer
              </span>
            </div>

            {/* CTA */}
            <div className="animate-fade-up delay-600">
              <a
                href="mailto:umMatt@umich.edu"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-ink-900 text-white font-medium text-sm hover:bg-ink-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
    </ContentPanel>
  );
}
