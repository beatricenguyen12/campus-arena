import { Mail } from 'lucide-react';

interface HeaderProps {
  onContactUs: () => void;
}

export function Header({ onContactUs }: HeaderProps) {
  return (
    <header className="bg-white sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[#1A1A1A]">Campus Arena</h3>
            <p className="text-[#6B7280] text-sm mt-1">ASU</p>
          </div>
          
          <button
            onClick={onContactUs}
            className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#2A56FF] transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="text-xs">Contact us</span>
          </button>
        </div>
      </div>
    </header>
  );
}
