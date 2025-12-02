import { Search, Mail } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onContactUs: () => void;
}

export function Header({ onSearch, searchQuery, onContactUs }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-start justify-between mb-4">
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
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[10px] border border-[#E5E7EB] focus:outline-none focus:border-[#2A56FF] transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
