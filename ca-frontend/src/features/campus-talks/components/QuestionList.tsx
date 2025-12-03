import { EmptyState } from '@/components/EmptyState';
import { QuestionCard } from '@/components/QuestionCard';
import { TalkQuestion } from '@/types';

interface QuestionListProps {
  questions: TalkQuestion[];
  onQuestionClick: (question: TalkQuestion) => void;
  onShare: (question: TalkQuestion) => void;
  emptyMessage: string;
}

export function QuestionList({
  questions,
  onQuestionClick,
  onShare,
  emptyMessage,
}: QuestionListProps) {
  if (questions.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onClick={() => onQuestionClick(question)}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
