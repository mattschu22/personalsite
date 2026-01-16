import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Custom SVG icons
const SkiingSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Skier going downhill */}
    <circle cx="32" cy="12" r="6" fill="currentColor" />
    <path
      d="M20 52L44 36"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M28 24L22 38L32 32L38 44"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 38L16 42"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M38 44L48 48"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Ski poles */}
    <path
      d="M26 26L18 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M36 30L46 42"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BaseballSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Baseball with stitches */}
    <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3" />
    {/* Left stitching curve */}
    <path
      d="M18 18C22 24 22 40 18 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M16 22L20 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 28L20 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 34L20 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 40L20 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Right stitching curve */}
    <path
      d="M46 18C42 24 42 40 46 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M48 22L44 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 28L44 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 34L44 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 40L44 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ScubaSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Diver mask */}
    <ellipse cx="32" cy="24" rx="14" ry="10" stroke="currentColor" strokeWidth="3" />
    <path d="M18 24H12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Snorkel */}
    <path
      d="M46 24C52 24 54 18 54 12C54 8 52 6 48 6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Bubbles */}
    <circle cx="14" cy="38" r="3" fill="currentColor" opacity="0.6" />
    <circle cx="20" cy="44" r="2.5" fill="currentColor" opacity="0.5" />
    <circle cx="12" cy="50" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="22" cy="54" r="1.5" fill="currentColor" opacity="0.3" />
    {/* Fins */}
    <path
      d="M28 40L24 56C24 58 32 60 40 56L36 40"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M32 40V48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CircuitSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Central processor node */}
    <rect x="24" y="24" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="3" />
    {/* Inner detail */}
    <rect x="28" y="28" width="8" height="8" fill="currentColor" opacity="0.3" />
    {/* Connection lines - top */}
    <path d="M28 24V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 24V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Connection lines - bottom */}
    <path d="M28 40V48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 40V48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Connection lines - left */}
    <path d="M24 28H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 36H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Connection lines - right */}
    <path d="M40 28H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 36H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Corner nodes */}
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="52" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="52" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="52" cy="52" r="4" stroke="currentColor" strokeWidth="2" />
    {/* Diagonal connections */}
    <path d="M15 15L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M49 15L40 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 49L24 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M49 49L40 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const icons = [
  { component: SkiingSvg, label: 'Skiing' },
  { component: BaseballSvg, label: 'Baseball' },
  { component: ScubaSvg, label: 'Scuba' },
  { component: CircuitSvg, label: 'CS' },
];

const name = 'Matt Schumacher';
const letters = name.split('');

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'icons' | 'letters' | 'done'>('icons');
  const [visibleIconCount, setVisibleIconCount] = useState(0);
  const [visibleLetterCount, setVisibleLetterCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Icon appearance timing
  useEffect(() => {
    if (phase !== 'icons') return;

    if (visibleIconCount < icons.length) {
      const timer = setTimeout(() => {
        setVisibleIconCount((prev) => prev + 1);
      }, 400); // 400ms between icons
      return () => clearTimeout(timer);
    } else {
      // All icons visible, wait then switch to letters
      const timer = setTimeout(() => {
        setPhase('letters');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleIconCount]);

  // Letter appearance timing (twice as fast)
  useEffect(() => {
    if (phase !== 'letters') return;

    if (visibleLetterCount < letters.length) {
      const timer = setTimeout(() => {
        setVisibleLetterCount((prev) => prev + 1);
      }, 80); // 80ms between letters (half of 160ms would be twice as fast as icons)
      return () => clearTimeout(timer);
    } else {
      // All letters visible, start fade out
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 500);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, visibleLetterCount, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-900 flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Icons or Letters display */}
        <div className="flex items-center justify-center gap-4 md:gap-6 h-20 md:h-28">
          {phase === 'icons' ? (
            // Show icons
            icons.map((icon, index) => {
              const Icon = icon.component;
              return (
                <div
                  key={icon.label}
                  className={`transition-all duration-300 ${
                    index < visibleIconCount
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-50 translate-y-4'
                  }`}
                >
                  <Icon className="w-14 h-14 md:w-20 md:h-20 text-white" />
                </div>
              );
            })
          ) : (
            // Show letters
            <div className="flex items-center justify-center flex-wrap">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white transition-all duration-150 ${
                    index < visibleLetterCount
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  } ${letter === ' ' ? 'mx-2 md:mx-4' : ''}`}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Subtle loading indicator */}
        {phase === 'icons' && (
          <div className="flex gap-2">
            {icons.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < visibleIconCount ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
