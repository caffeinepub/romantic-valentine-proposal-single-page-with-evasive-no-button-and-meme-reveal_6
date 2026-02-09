import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position to center-right
  useEffect(() => {
    if (noButtonRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      setNoPosition({
        x: containerRect.width / 2 + 80,
        y: containerRect.height / 2 - buttonRect.height / 2
      });
    }
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries (with padding)
    const padding = 20;
    const maxX = container.width - button.width - padding;
    const maxY = container.height - button.height - padding;

    // Generate random position
    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;

    setNoPosition({ x: newX, y: newY });
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  const handleNoTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleNoPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  if (yesClicked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <Heart className="w-16 h-16 mx-auto text-romantic-primary fill-romantic-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-romantic-dark">
              Perfect Choice! 💕
            </h1>
            <p className="text-xl md:text-2xl text-romantic-medium font-medium">
              I knew you'd say yes, Aqsa! ✨
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-romantic-primary">
            <img 
              src="/assets/generated/valentine-good-choice-meme.dim_1200x900.png" 
              alt="Good choice meme"
              className="w-full h-auto"
            />
          </div>

          <p className="text-lg text-romantic-medium italic">
            Happy Valentine's Day, my love! 💖
          </p>
        </div>

        <footer className="mt-16 text-center text-sm text-romantic-medium/70">
          <p>© {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 fill-romantic-primary text-romantic-primary" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'valentine-app')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
      <div className="max-w-3xl w-full text-center space-y-12 animate-fade-in">
        <div className="space-y-6">
          <div className="flex justify-center gap-2 animate-float">
            <Heart className="w-12 h-12 text-romantic-primary fill-romantic-primary" />
            <Heart className="w-12 h-12 text-romantic-accent fill-romantic-accent animate-pulse" />
            <Heart className="w-12 h-12 text-romantic-primary fill-romantic-primary" />
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-romantic-dark leading-tight">
            Hey Aqsa Kousar! 💕
          </h1>
          
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl font-semibold text-romantic-medium">
              Will you be my Valentine?
            </p>
            <p className="text-lg md:text-xl text-romantic-medium/80">
              Choose wisely... 😊
            </p>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative h-64 md:h-80 flex items-center justify-center"
        >
          {/* Yes Button - Fixed position */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-32 md:-ml-40">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="text-xl md:text-2xl px-12 md:px-16 py-6 md:py-8 bg-romantic-primary hover:bg-romantic-primary-dark text-white font-bold rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white"
            >
              Yes! 💖
            </Button>
          </div>

          {/* No Button - Moving position */}
          <button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoTouch}
            onPointerDown={handleNoPointerDown}
            style={{
              position: 'absolute',
              left: `${noPosition.x}px`,
              top: `${noPosition.y}px`,
              transition: 'all 0.3s ease-out'
            }}
            className="text-xl md:text-2xl px-12 md:px-16 py-6 md:py-8 bg-romantic-muted hover:bg-romantic-muted text-romantic-dark font-bold rounded-full shadow-xl border-4 border-romantic-border cursor-pointer touch-none"
          >
            No 😢
          </button>
        </div>

        <p className="text-sm md:text-base text-romantic-medium/60 italic">
          Hint: The "No" button is a bit shy... 🙈
        </p>
      </div>

      <footer className="mt-16 text-center text-sm text-romantic-medium/70">
        <p>© {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 fill-romantic-primary text-romantic-primary" /> using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'valentine-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-romantic-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
