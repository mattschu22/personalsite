import ContentPanel from '../components/ContentPanel';

export default function ContactSection() {
  return (
    <ContentPanel>
      {/* Header */}
      <div className="px-8 md:px-12 lg:px-16 pt-14 pb-10 bg-gradient-to-b from-amber-50/50 to-transparent">
        <p className="animate-fade-up text-[11px] tracking-[0.2em] uppercase text-amber-600 mb-3 font-semibold">Get in Touch</p>
        <h2 className="animate-scale-in delay-100 font-display text-display-xl text-ink-900">
          Contact
        </h2>
      </div>

      {/* Content */}
      <div className="px-8 md:px-12 lg:px-16 py-10 space-y-6">
        {/* Contact methods */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Email */}
          <a
            href="mailto:umMatt@umich.edu"
            className="card p-6 group animate-fade-up delay-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border-blue-200/50"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-blue-600 font-bold">Email</span>
            </div>
            <p className="font-display text-xl md:text-2xl text-ink-900 italic mb-3">
              umMatt@umich.edu
            </p>
            <div className="flex items-center gap-2 text-sm text-ink-500 group-hover:text-blue-600 transition-colors font-medium">
              Send email
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+12489903548"
            className="card p-6 group animate-fade-up delay-300 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-violet-50/50 to-purple-50/30 border-violet-200/50"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-violet-600 font-bold">Phone</span>
            </div>
            <p className="font-display text-xl md:text-2xl text-ink-900 italic mb-3">
              (248) 990-3548
            </p>
            <div className="flex items-center gap-2 text-sm text-ink-500 group-hover:text-violet-600 transition-colors font-medium">
              Call now
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </a>
        </div>

        {/* Location & Social */}
        <div className="card p-6 animate-fade-up delay-400">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center border border-amber-200">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-ink-400 mb-1 font-medium">Location</p>
                <p className="font-display text-lg text-ink-900 italic">Ann Arbor, Michigan</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/umMatt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-blue-500/20"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/umMatt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-ink-900 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Availability CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-8 md:p-10 relative overflow-hidden animate-fade-up delay-500 shadow-xl">
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, transparent 60%)' }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse-gentle shadow-lg shadow-emerald-500/50" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400 font-bold">Available Now</span>
            </div>
            <p className="font-display text-2xl md:text-4xl text-white italic mb-8 max-w-md leading-tight">
              Open to full-time opportunities starting May 2026
            </p>
            <a
              href="mailto:umMatt@umich.edu"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-white text-ink-900 font-semibold text-sm hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Let's Connect
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
