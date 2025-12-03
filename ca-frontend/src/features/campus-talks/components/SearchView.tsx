import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Question } from '@/types';

import { QuestionList } from './QuestionList';

interface SearchViewProps {
  results: Question[];
  searchQuery: string;
  onQuestionClick: (question: Question) => void;
  onAskQuestion: () => void;
  onShare: (question: Question) => void;
}

export function SearchView({
  results,
  searchQuery,
  onQuestionClick,
  onAskQuestion,
  onShare,
}: SearchViewProps) {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-6 pb-24">
        <h2 className="text-[#1A1A1A] mb-6">Search Results for "{searchQuery}"</h2>

        <QuestionList
          questions={results}
          onQuestionClick={onQuestionClick}
          onShare={onShare}
          emptyMessage="No results found. Try a different keyword."
        />
      </div>

      <FloatingActionButton onClick={onAskQuestion} />
    </>
  );
}
