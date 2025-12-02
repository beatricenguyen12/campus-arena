import { Question } from '../types';

import { EmptyState } from './EmptyState';
import { FloatingActionButton } from './FloatingActionButton';
import { QuestionCard } from './QuestionCard';

interface SearchViewProps {
  questions: Question[];
  searchQuery: string;
  onQuestionClick: (question: Question) => void;
  onAskQuestion: () => void;
  onShare: (question: Question) => void;
}

export function SearchView({ questions, searchQuery, onQuestionClick, onAskQuestion, onShare }: SearchViewProps) {
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answers.some((a) => a.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-6 pb-24">
        <h2 className="text-[#1A1A1A] mb-6">
          Search Results for "{searchQuery}"
        </h2>

        {filteredQuestions.length > 0 ? (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() => onQuestionClick(question)}
                onShare={onShare}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="No results found. Try a different keyword." />
        )}
      </div>
      
      <FloatingActionButton onClick={onAskQuestion} />
    </>
  );
}
