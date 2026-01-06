import { useState, useEffect, useCallback, useRef } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'success';
  text: string;
  prefix?: string;
}

interface CommandSequenceItem {
  delay: number;
  line: TerminalLine;
}

const COMMAND_SEQUENCE: CommandSequenceItem[] = [
  { delay: 300, line: { type: 'command', text: 'whoami', prefix: '$ ' } },
  { delay: 500, line: { type: 'output', text: 'matt-schumacher' } },
  { delay: 700, line: { type: 'command', text: 'cat stack.txt', prefix: '$ ' } },
  { delay: 500, line: { type: 'output', text: 'kernel → systems → backend → frontend → ml' } },
  { delay: 700, line: { type: 'command', text: './build --all', prefix: '$ ' } },
  { delay: 400, line: { type: 'success', text: 'Building systems that scale', prefix: '✓ ' } },
  { delay: 400, line: { type: 'success', text: 'From kernels to clouds', prefix: '✓ ' } },
  { delay: 500, line: { type: 'output', text: 'Ready. Available May 2026.' } },
];

const TYPING_SPEED = 40; // ms per character

interface TerminalHeroProps {
  onComplete: () => void;
}

export default function TerminalHero({ onComplete }: TerminalHeroProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const sequenceIndexRef = useRef(0);
  const hasSkippedRef = useRef(false);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Type out text character by character
  const typeText = useCallback((text: string, onComplete: () => void) => {
    setIsTyping(true);
    let charIndex = 0;
    setCurrentTypingText('');

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setCurrentTypingText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        onComplete();
      }
    }, TYPING_SPEED);

    return () => clearInterval(typeInterval);
  }, []);

  // Process command sequence
  useEffect(() => {
    if (sequenceIndexRef.current >= COMMAND_SEQUENCE.length) {
      setIsComplete(true);
      return;
    }

    const currentItem = COMMAND_SEQUENCE[sequenceIndexRef.current];

    const timeoutId = setTimeout(() => {
      if (currentItem.line.type === 'command') {
        // Type out commands
        typeText(currentItem.line.text, () => {
          setLines(prev => [...prev, currentItem.line]);
          setCurrentTypingText('');
          sequenceIndexRef.current++;
        });
      } else {
        // Output and success lines appear instantly
        setLines(prev => [...prev, currentItem.line]);
        sequenceIndexRef.current++;
      }
    }, currentItem.delay);

    return () => clearTimeout(timeoutId);
  }, [lines, typeText]);

  // Auto-advance after completion
  useEffect(() => {
    if (isComplete && !hasSkippedRef.current) {
      const timer = setTimeout(() => {
        if (!hasSkippedRef.current) {
          hasSkippedRef.current = true;
          onComplete();
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  // Skip handler
  const handleSkip = useCallback(() => {
    if (!hasSkippedRef.current) {
      hasSkippedRef.current = true;
      onComplete();
    }
  }, [onComplete]);

  // Skip on click or key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't skip on Tab for accessibility
      if (e.key !== 'Tab') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleSkip);
    };
  }, [handleSkip]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-neutral-300';
      case 'success':
        return 'text-emerald-400';
      case 'output':
      default:
        return 'text-neutral-400';
    }
  };

  const getPrefixColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-emerald-400';
      case 'success':
        return 'text-emerald-400';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in">
      {/* Terminal window */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 60px rgba(59, 130, 246, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs text-neutral-500 font-mono">terminal</span>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]">
          {lines.map((line, idx) => (
            <div key={idx} className={`${getLineColor(line.type)} mb-1`}>
              {line.prefix && (
                <span className={getPrefixColor(line.type)}>{line.prefix}</span>
              )}
              {line.text}
            </div>
          ))}

          {/* Currently typing line */}
          {isTyping && (
            <div className="text-neutral-300 mb-1">
              <span className="text-emerald-400">$ </span>
              {currentTypingText}
              <span
                className={`inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-amber-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.1s' }}
              />
            </div>
          )}

          {/* Resting cursor when not typing */}
          {!isTyping && !isComplete && lines.length > 0 && (
            <div className="text-neutral-300">
              <span className="text-emerald-400">$ </span>
              <span
                className={`inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-amber-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.1s' }}
              />
            </div>
          )}

          {/* Initial cursor */}
          {lines.length === 0 && !isTyping && (
            <div className="text-neutral-300">
              <span className="text-emerald-400">$ </span>
              <span
                className={`inline-block w-2 h-4 ml-0.5 -mb-0.5 bg-amber-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.1s' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
