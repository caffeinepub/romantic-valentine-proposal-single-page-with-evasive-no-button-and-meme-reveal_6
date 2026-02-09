import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Lock } from 'lucide-react';

interface PasswordGateViewProps {
  onUnlock: (password: string) => boolean;
}

export default function PasswordGateView({ onUnlock }: PasswordGateViewProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay for better UX
    setTimeout(() => {
      const success = onUnlock(password);
      if (!success) {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-16 h-16 text-romantic-primary fill-romantic-primary animate-pulse" />
              <Lock className="w-8 h-8 text-romantic-accent absolute -bottom-1 -right-1 bg-white rounded-full p-1" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-romantic-dark">
            Protected Valentine 💕
          </h1>
          
          <p className="text-lg text-romantic-medium">
            Enter the password to unlock this special message
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="text-center text-lg py-6 border-2 border-romantic-border focus:border-romantic-primary bg-white"
              autoFocus
            />
            
            {error && (
              <p className="text-sm text-red-500 text-center animate-fade-in">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!password || isLoading}
            className="w-full text-lg py-6 bg-romantic-primary hover:bg-romantic-primary-dark text-white font-bold rounded-full shadow-xl"
          >
            {isLoading ? 'Unlocking...' : 'Unlock 🔓'}
          </Button>
        </form>

        <p className="text-sm text-romantic-medium/60 text-center italic">
          Hint: The most happiest day for me.
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
