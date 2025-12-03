import { TalkAnswer } from '@/types';
import { formatTimeAgo } from '@/utils/time';

interface AnswerCardProps {
  answer: TalkAnswer;
}

export function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <div
      className="bg-white rounded-[12px] p-5 mb-4"
      style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)' }}
    >
      <p className="text-[#1A1A1A] mb-2">{answer.content}</p>
      <div className="text-[#6B7280] text-[13px]">
        {formatTimeAgo(answer.createdAt)}
      </div>
    </div>
  );
}
