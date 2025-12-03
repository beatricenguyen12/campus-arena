import { MoreVertical, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { TalkQuestion } from '@/types';
import { formatTimeAgo } from '@/utils/time';

interface QuestionCardProps {
  question: TalkQuestion;
  onClick: () => void;
  onShare: (question: TalkQuestion) => void;
}

export function QuestionCard({ question, onClick, onShare }: QuestionCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const answers = question.answers ?? [];
  const hasAnswers = answers.length > 0;
  const answerCount = answers.length;
  const lastAnsweredAt = hasAnswers
    ? answers.reduce(
        (latest, current) =>
          new Date(current.createdAt).getTime() >
          new Date(latest).getTime()
            ? current.createdAt
            : latest,
        answers[0].createdAt,
      )
    : null;
  const lastActivity = lastAnsweredAt ?? question.createdAt;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(question);
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bg-white rounded-[12px] p-5 cursor-pointer transition-shadow hover:shadow-md relative"
      style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)' }}
    >
      <h3 className="text-[#1A1A1A] mb-2">{question.title}</h3>
      
      {question.body && (
        <p className="text-[#6B7280] mb-3">{question.body}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-[#6B7280] text-[13px]">
          {hasAnswers ? (
            <>
              {answerCount} {answerCount === 1 ? 'answer' : 'answers'} · Last
              answered {formatTimeAgo(lastActivity)}
            </>
          ) : (
            <>No answers yet · {formatTimeAgo(question.createdAt)}</>
          )}
        </div>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="p-1 hover:bg-[#F8F9FC] rounded-full transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-[#6B7280]" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white rounded-[8px] shadow-lg z-10 py-1" style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', minWidth: '120px' }}>
              <button
                onClick={handleShare}
                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-[#F8F9FC] transition-colors text-left"
              >
                <Share2 className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[#1A1A1A]">Share</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
