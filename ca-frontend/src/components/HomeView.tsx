import { useState } from 'react';

import { Question, TabType } from '../types';

import { EmptyState } from './EmptyState';
import { FloatingActionButton } from './FloatingActionButton';
import { QuestionCard } from './QuestionCard';
import { Tabs } from './Tabs';

interface HomeViewProps {
  onQuestionClick: (question: Question) => void;
  allQuestions: Question[];
  onAskQuestion: () => void;
  onShare: (question: Question) => void;
}

export function HomeView({ onQuestionClick, allQuestions, onAskQuestion, onShare }: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('answered');

  const answeredQuestions = allQuestions.filter(q => q.answers.length > 0);
  const needsAnswers = allQuestions.filter(q => q.answers.length === 0);

  const displayedQuestions = activeTab === 'answered' ? answeredQuestions : needsAnswers;

  return (
    <div>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-4xl mx-auto px-6 py-6 pb-24">
        {displayedQuestions.length > 0 ? (
          <div className="space-y-4">
            {displayedQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() => onQuestionClick(question)}
                onShare={onShare}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            message={
              activeTab === 'answered'
                ? 'No questions yet — ask the first one!'
                : 'No unanswered questions right now!'
            }
          />
        )}
      </div>
      
      <FloatingActionButton onClick={onAskQuestion} />
    </div>
  );
}
