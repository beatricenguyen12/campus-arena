import { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export function SplashScreen({ onComplete, durationMs = 2000 }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, durationMs);
    return () => clearTimeout(timer);
  }, [onComplete, durationMs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A56FF] via-[#4169FF] to-[#5B7EFF] flex items-center justify-center animate-fade-in overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
            <span className="text-[#2A56FF]" style={{ fontSize: '42px', fontWeight: 700 }}>
              CA
            </span>
          </div>
        </div>

        <h1 className="text-white mb-3 animate-slide-down" style={{ fontSize: '42px' }}>
          Campus Arena
        </h1>
        <p className="text-white/90 text-xl animate-slide-up">Your Campus. Your Arena.</p>

        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
