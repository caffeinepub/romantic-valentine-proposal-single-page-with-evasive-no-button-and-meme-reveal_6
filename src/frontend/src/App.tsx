import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Lock } from 'lucide-react';
import PasswordGateView from '@/components/PasswordGateView';

const CORRECT_PASSWORD = '9102008';
const SESSION_KEY = 'valentine_unlocked';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const confirmationPhotos = [
    '/assets/generated/IMG_20260210_031107_923.dim_1024x1536.jpg',
    '/assets/generated/IMG_20260210_032555_590.dim_640x480.jpg'
  ];

  // Check session storage on mount
  useEffect(() => {
    const unlocked = sessionStorage.getItem(SESSION_KEY);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

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

  const handleUnlock = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
      return true;
    }
    return false;
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setYesClicked(false);
    setCurrentPhotoIndex(0);
    sessionStorage.removeItem(SESSION_KEY);
  };

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

  const togglePhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % confirmationPhotos.length);
  };

  // Show password gate if not unlocked
  if (!isUnlocked) {
    return <PasswordGateView onUnlock={handleUnlock} />;
  }

  if (yesClicked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
        <div className="absolute top-4 right-4">
          <Button
            onClick={handleLock}
            variant="ghost"
            size="sm"
            className="text-romantic-medium/60 hover:text-romantic-medium"
          >
            <Lock className="w-4 h-4 mr-2" />
            Lock
          </Button>
        </div>

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
          
          <div 
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-romantic-primary cursor-pointer hover:scale-[1.02] transition-transform duration-300 active:scale-[0.98]"
            onClick={togglePhoto}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePhoto();
              }
            }}
            aria-label="Tap to see another photo"
          >
            <img 
              src={confirmationPhotos[currentPhotoIndex]}
              alt={currentPhotoIndex === 0 ? "Illustrated couple together outdoors under trees" : "Couple selfie together in nature"}
              className="w-full h-auto"
            />
          </div>

          <p className="text-sm text-romantic-medium/60 italic">
            💡 Tap the photo to see more! 📸
          </p>

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
      <div className="absolute top-4 right-4">
        <Button
          onClick={handleLock}
          variant="ghost"
          size="sm"
          className="text-romantic-medium/60 hover:text-romantic-medium"
        >
          <Lock className="w-4 h-4 mr-2" />
          Lock
        </Button>
      </div>

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
          {/* Yes Button - Fixed position with romantic animations */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-32 md:-ml-40">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="romantic-yes-button text-xl md:text-2xl px-12 md:px-16 py-6 md:py-8 bg-romantic-primary hover:bg-romantic-primary-dark text-white font-bold rounded-full shadow-2xl border-4 border-white"
            >
              Yes! 💖
            </Button>
          </div>

          {/* No Button - Moving position with playful animation */}
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
            className="playful-no-button text-xl md:text-2xl px-12 md:px-16 py-6 md:py-8 bg-romantic-muted hover:bg-romantic-muted text-romantic-dark font-bold rounded-full shadow-xl border-4 border-romantic-border cursor-pointer touch-none"
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
