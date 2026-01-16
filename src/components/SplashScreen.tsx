import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const icons = [
  '/blockm_icon.png',
  '/distributedsystems_icon.png',
  '/baseball_icon.png',
  '/skiing_icon.png',
];

const letters = ['M', 'a', 't', 't'];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visibleIcons, setVisibleIcons] = useState<number[]>([]);
  const [visibleLetters, setVisibleLetters] = useState<number[]>([]);
  const [phase, setPhase] = useState<'icons' | 'letters' | 'fade'>('icons');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Phase 1: Show icons one at a time (400ms each)
    const iconTimers: NodeJS.Timeout[] = [];
    icons.forEach((_, i) => {
      iconTimers.push(
        setTimeout(() => {
          setVisibleIcons(prev => [...prev, i]);
        }, i * 400)
      );
    });

    // Phase 2: Switch to letters and show them twice as fast (200ms each)
    const lettersStartTime = icons.length * 400 + 300; // Small pause after icons

    const phaseTimer = setTimeout(() => {
      setPhase('letters');
      setVisibleLetters([]);
    }, lettersStartTime);

    const letterTimers: NodeJS.Timeout[] = [];
    letters.forEach((_, i) => {
      letterTimers.push(
        setTimeout(() => {
          setVisibleLetters(prev => [...prev, i]);
        }, lettersStartTime + i * 200)
      );
    });

    // Phase 3: Fade out and complete
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, lettersStartTime + letters.length * 200 + 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, lettersStartTime + letters.length * 200 + 1000);

    return () => {
      iconTimers.forEach(clearTimeout);
      letterTimers.forEach(clearTimeout);
      clearTimeout(phaseTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-slate-900 flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex gap-4 md:gap-8">
        {phase === 'icons' ? (
          // Icons phase
          icons.map((icon, i) => (
            <div
              key={`icon-${i}`}
              className={`w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 transition-all duration-300 ${
                visibleIcons.includes(i)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-75'
              }`}
            >
              <img
                src={icon}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          ))
        ) : (
          // Letters phase
          letters.map((letter, i) => (
            <div
              key={`letter-${i}`}
              className={`w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center transition-all duration-200 ${
                visibleLetters.includes(i)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-50'
              }`}
            >
              <span className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white">
                {letter}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
