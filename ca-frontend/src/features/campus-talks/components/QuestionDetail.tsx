import { ArrowLeft, MoreVertical, Send, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { AnswerCard } from '@/components/AnswerCard';
import { EmptyState } from '@/components/EmptyState';
import { TalkQuestion } from '@/types';
import { formatTimeAgo } from '@/utils/time';

interface QuestionDetailProps {
  question: TalkQuestion;
  onBack: () => void;
  onAddAnswer: (questionId: number, content: string) => void;
  onShowSnackbar: (message: string, type: 'success' | 'error') => void;
  onShare: (question: TalkQuestion) => void;
}

export function QuestionDetail({
  question,
  onBack,
  onAddAnswer,
  onShowSnackbar,
  onShare,
}: QuestionDetailProps) {
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const answers = question.answers ?? [];

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

  const handleShareClick = () => {
    onShare(question);
    setShowMenu(false);
  };

  const handleSubmit = () => {
    if (!answerContent.trim()) {
      onShowSnackbar('Please write an answer', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onAddAnswer(question.id, answerContent);
      setAnswerContent('');
      setIsSubmitting(false);
      onShowSnackbar('Your answer has been added successfully!', 'success');
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FC]">
      <div className="bg-white border-b border-[#E5E7EB] flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div
            className="bg-white rounded-[12px] p-6 mb-6"
            style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)' }}
          >
            <h2 className="text-[#1A1A1A] mb-3">{question.title}</h2>
            {question.body && <p className="text-[#6B7280] mb-3">{question.body}</p>}
            <div className="flex items-center justify-between text-[#6B7280] text-[13px]">
              <span>Asked {formatTimeAgo(question.createdAt)}</span>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 hover:bg-[#F8F9FC] rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-[#6B7280]" />
                </button>
                {showMenu && (
                  <div
                    className="absolute right-0 top-8 bg-white rounded-[8px] shadow-lg z-10 py-1"
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', minWidth: '140px' }}
                  >
                    <button
                      onClick={handleShareClick}
                      className="w-full px-4 py-2 flex items-center gap-2 hover:bg-[#F8F9FC] transition-colors text-left"
                    >
                      <Share2 className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-[#1A1A1A] text-sm">Share</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#1A1A1A] mb-4">
              {answers.length > 0
                ? `${answers.length} ${answers.length === 1 ? 'Answer' : 'Answers'}`
                : 'No Answers Yet'}
            </h3>

            {answers.length > 0 ? (
              answers.map((answer) => <AnswerCard key={answer.id} answer={answer} />)
            ) : (
              <EmptyState message="Be the first to answer this question!" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-[#E5E7EB] flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <input
              type="text"
              placeholder="Write your answer..."
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-[10px] border border-[#E5E7EB] focus:outline-none focus:border-[#2A56FF] transition-colors disabled:opacity-50"
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="p-3 bg-[#2A56FF] text-white rounded-[10px] hover:bg-[#1e42d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
