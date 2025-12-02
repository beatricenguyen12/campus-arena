import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';

import { Question } from '../types';

import { AnswerCard } from './AnswerCard';
import { EmptyState } from './EmptyState';

interface QuestionDetailProps {
  question: Question;
  onBack: () => void;
  onAddAnswer: (questionId: string, content: string) => void;
  onShowSnackbar: (message: string, type: 'success' | 'error') => void;
}

export function QuestionDetail({ question, onBack, onAddAnswer, onShowSnackbar }: QuestionDetailProps) {
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      {/* Header */}
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

      {/* Question and Answers - Scrollable */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Question Header */}
          <div className="bg-white rounded-[12px] p-6 mb-6" style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)' }}>
            <h2 className="text-[#1A1A1A] mb-3">{question.title}</h2>
            {question.body && (
              <p className="text-[#6B7280] mb-3">{question.body}</p>
            )}
            <div className="text-[#6B7280] text-[13px]">
              Asked {question.timestamp}
            </div>
          </div>

          {/* Answers Section */}
          <div className="mb-6">
            <h3 className="text-[#1A1A1A] mb-4">
              {question.answers.length > 0
                ? `${question.answers.length} ${question.answers.length === 1 ? 'Answer' : 'Answers'}`
                : 'No Answers Yet'}
            </h3>
            
            {question.answers.length > 0 ? (
              question.answers.map((answer) => (
                <AnswerCard key={answer.id} answer={answer} />
              ))
            ) : (
              <EmptyState message="Be the first to answer this question!" />
            )}
          </div>
        </div>
      </div>

      {/* Fixed Answer Input at Bottom */}
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
