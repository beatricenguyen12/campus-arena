import { ReactNode } from 'react';

import { TalkQuestion, ViewType } from '@/types';

import { AskQuestion } from './AskQuestion';
import { HomeView } from './HomeView';
import { QuestionDetail } from './QuestionDetail';

interface ViewRouterProps {
  currentView: ViewType;
  searchResults: TalkQuestion[];
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedQuestion: TalkQuestion | null;
  onQuestionClick: (question: TalkQuestion) => void;
  onAskQuestion: () => void;
  onBack: () => void;
  onShare: (question: TalkQuestion) => void;
  onAddAnswer: (questionId: number, content: string) => void;
  onSubmitQuestion: (title: string, body: string) => void;
  onShowSnackbar: (message: string, type: 'success' | 'error') => void;
}

export function ViewRouter({
  currentView,
  searchResults,
  searchQuery,
  onSearch,
  selectedQuestion,
  onQuestionClick,
  onAskQuestion,
  onBack,
  onShare,
  onAddAnswer,
  onSubmitQuestion,
  onShowSnackbar,
}: ViewRouterProps): ReactNode {
  switch (currentView) {
    case 'home':
    case 'search':
      return (
        <HomeView
          onQuestionClick={onQuestionClick}
          questions={searchResults}
          searchQuery={searchQuery}
          onSearch={onSearch}
          onAskQuestion={onAskQuestion}
          onShare={onShare}
        />
      );
    case 'question-detail':
      return selectedQuestion ? (
        <QuestionDetail
          question={selectedQuestion}
          onBack={onBack}
          onAddAnswer={onAddAnswer}
          onShowSnackbar={onShowSnackbar}
          onShare={onShare}
        />
      ) : null;
    case 'ask-question':
      return (
        <AskQuestion
          onBack={onBack}
          onSubmit={onSubmitQuestion}
          onShowSnackbar={onShowSnackbar}
        />
      );
    default:
      return null;
  }
}
