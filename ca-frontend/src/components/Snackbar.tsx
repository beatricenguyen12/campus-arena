import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export function Snackbar({ message, type, onClose, duration = 3000 }: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div
        className={`px-6 py-4 rounded-[10px] shadow-lg flex items-center gap-3 ${
          type === 'success'
            ? 'bg-[#10B981] text-white'
            : 'bg-[#EF4444] text-white'
        }`}
        style={{ minWidth: '320px' }}
      >
        <span className="text-xl">
          {type === 'success' ? '✨' : '⚠️'}
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
}
