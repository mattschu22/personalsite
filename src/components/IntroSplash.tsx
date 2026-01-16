import { useState, useEffect } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

// Icons representing interests - roughly matching the length of "Matt Schumacher" (15 chars)
const icons = [
  // Baseball
  <svg key="baseball" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M4.5 9.5c2 1 4 1.5 6 1.5s4-.5 6-1.5M4.5 14.5c2-1 4-1.5 6-1.5s4 .5 6 1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>,
  // Travel/Plane
  <svg key="plane" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>,
  // Skiing
  <svg key="skiing" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <circle cx="12" cy="4" r="2" />
    <path d="M5 20l14-4M8 13l4 1 3-5-2-1M10 16l2-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>,
  // Snorkeling/Diving mask
  <svg key="snorkel" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="20" y1="12" x2="20" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="4" r="1.5" fill="currentColor" />
  </svg>,
  // Computer/Code
  <svg key="computer" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 8l3 3-3 3M12 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>,
  // University of Michigan (Block M)
  <svg key="umich" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M3 19V5l4.5 7L12 5l4.5 7L21 5v14h-3V11l-3 4.5h-1L12 11v8H9v-8l-3 4.5L3 19z" />
  </svg>,
  // Football
  <svg key="football" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-45 12 12)" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 8v8M9 10.5L15 13.5M9 13.5L15 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // National Parks/Trees
  <svg key="parks" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2L6 10h3l-3 6h4l-2 6h8l-2-6h4l-3-6h3L12 2z" />
  </svg>,
  // Beach/Palm
  <svg key="beach" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 3c0 4 2 7 6 8-4 1-8 0-10-3 0 4 2 7 4 9v4h-2v1h6v-1h-2v-4c2-2 4-5 4-9-2 3-6 4-10 3 4-1 6-4 6-8h-2z" />
  </svg>,
  // Car
  <svg key="car" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M5 17h14v-5l-2-4H7l-2 4v5z" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="7.5" cy="17" r="1.5" />
    <circle cx="16.5" cy="17" r="1.5" />
    <path d="M7 10l1.5-3h7l1.5 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>,
  // Mountains (skiing related)
  <svg key="mountains" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M2 20l7-12 4 6 3-4 6 10H2z" />
    <circle cx="18" cy="6" r="2" />
  </svg>,
  // Waves (snorkeling related)
  <svg key="waves" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>,
  // Hiking boots
  <svg key="hiking" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M4 18h5l2-6h4l3 6h2v2H4v-2zM8 12l2-6h4l1 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Sun
  <svg key="sun" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  // Compass (travel related)
  <svg key="compass" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <polygon points="12,5 14,12 12,19 10,12" />
  </svg>,
];

const name = "Matt Schumacher";

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [visibleIcons, setVisibleIcons] = useState<number>(0);
  const [showLetters, setShowLetters] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Phase 1: Show icons one at a time
  useEffect(() => {
    if (visibleIcons < icons.length && !showLetters) {
      const timer = setTimeout(() => {
        setVisibleIcons(prev => prev + 1);
      }, 120); // Timing for each icon
      return () => clearTimeout(timer);
    } else if (visibleIcons >= icons.length && !showLetters) {
      // All icons shown, pause briefly then start letters
      const timer = setTimeout(() => {
        setShowLetters(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [visibleIcons, showLetters]);

  // Phase 2: Replace with letters (twice as fast)
  useEffect(() => {
    if (showLetters && visibleLetters < name.length) {
      const timer = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, 60); // Twice as fast as icons
      return () => clearTimeout(timer);
    } else if (showLetters && visibleLetters >= name.length) {
      // All letters shown, pause then fade out
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [showLetters, visibleLetters]);

  // Phase 3: Complete after fade
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Icons/Letters container */}
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {icons.map((icon, index) => {
          // Determine what to show at this position
          const letterIndex = index;
          const letter = name[letterIndex] || '';
          const showLetter = showLetters && letterIndex < visibleLetters;
          const showIcon = !showLetters && index < visibleIcons;
          const isSpace = letter === ' ';

          return (
            <div
              key={index}
              className={`relative w-6 h-6 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${
                showIcon || showLetter ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            >
              {/* Icon */}
              <div
                className={`absolute inset-0 text-blue-300/80 transition-all duration-200 ${
                  showLetter ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
              >
                {icon}
              </div>

              {/* Letter */}
              <span
                className={`absolute inset-0 flex items-center justify-center font-display text-xl md:text-4xl font-bold text-white transition-all duration-200 ${
                  showLetter && !isSpace ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
                }`}
              >
                {letter}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtle loading indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white/30 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
