import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#2A56FF] text-white rounded-full shadow-lg hover:bg-[#1e42d4] transition-all hover:scale-110 z-50 flex items-center justify-center"
      style={{ boxShadow: '0px 4px 12px rgba(42, 86, 255, 0.4)' }}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
