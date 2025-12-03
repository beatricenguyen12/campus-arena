import { useState } from 'react';

import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Tabs } from '@/components/Tabs';
import { Question, TabType } from '@/types';

import { QuestionList } from './QuestionList';

interface HomeViewProps {
  onQuestionClick: (question: Question) => void;
  questions: Question[];
  searchQuery: string;
  onSearch: (query: string) => void;
  onAskQuestion: () => void;
  onShare: (question: Question) => void;
}

export function HomeView({
  onQuestionClick,
  questions,
  searchQuery,
  onSearch,
  onAskQuestion,
  onShare,
}: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('answered');

  const answeredQuestions = questions.filter((q) => q.answers.length > 0);
  const needsAnswers = questions.filter((q) => q.answers.length === 0);

  const displayedQuestions =
    activeTab === 'answered' ? answeredQuestions : needsAnswers;

  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-4 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[10px] border border-[#E5E7EB] focus:outline-none focus:border-[#2A56FF] transition-colors"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm">
            🔍
          </span>
        </div>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-4xl mx-auto px-6 py-6 pb-24">
        <QuestionList
          questions={displayedQuestions}
          onQuestionClick={onQuestionClick}
          onShare={onShare}
          emptyMessage={
            activeTab === 'answered'
              ? 'No questions yet — ask the first one!'
              : 'No unanswered questions right now!'
          }
        />
      </div>

      <FloatingActionButton onClick={onAskQuestion} />
    </div>
  );
}
