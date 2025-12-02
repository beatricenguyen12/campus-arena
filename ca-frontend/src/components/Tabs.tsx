import { TabType } from '../types';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-[#E5E7EB] bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-8">
          <button
            onClick={() => onTabChange('answered')}
            className="relative py-4 transition-colors"
          >
            <span
              className={
                activeTab === 'answered'
                  ? 'text-[#2A56FF]'
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }
            >
              Answered
            </span>
            {activeTab === 'answered' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A56FF] animate-slide-in" />
            )}
          </button>
          
          <button
            onClick={() => onTabChange('needs-answers')}
            className="relative py-4 transition-colors"
          >
            <span
              className={
                activeTab === 'needs-answers'
                  ? 'text-[#2A56FF]'
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }
            >
              Unanswered
            </span>
            {activeTab === 'needs-answers' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A56FF] animate-slide-in" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
