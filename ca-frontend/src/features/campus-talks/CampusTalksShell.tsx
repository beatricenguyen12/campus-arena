import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Snackbar } from '@/components/Snackbar';
import { TalkQuestion, ViewType } from '@/types';

import { ViewRouter } from './components/ViewRouter';
import { useQuestions } from './hooks/useQuestions';
import { useSearch } from './hooks/useSearch';

export function CampusTalksShell() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { questions, findQuestionById, addAnswer, addQuestion, shareQuestion } =
    useQuestions();
  const [selectedQuestion, setSelectedQuestion] = useState<TalkQuestion | null>(null);
  const { searchQuery, setSearchQuery, searchResults } = useSearch(questions);
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [snackbar, setSnackbar] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    visible: false,
  });

  const parsedQuestionId = questionId ? Number(questionId) : null;
  const questionFromUrl =
    parsedQuestionId && !Number.isNaN(parsedQuestionId)
      ? findQuestionById(parsedQuestionId)
      : null;
  const notFound = Boolean(questionId && parsedQuestionId && !questionFromUrl);
  const activeQuestion = questionFromUrl || selectedQuestion;
  const activeView: ViewType =
    questionId && questionFromUrl
      ? 'question-detail'
      : questionId && !questionFromUrl
        ? 'home'
        : currentView;

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ message, type, visible: true });
  };

  const hideSnackbar = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  const handleQuestionClick = (question: TalkQuestion) => {
    const currentQuestion = findQuestionById(question.id) || question;
    setSelectedQuestion(currentQuestion);
    setCurrentView('question-detail');
    setSearchQuery('');
    navigate(`/talks/${currentQuestion.id}`);
  };

  const handleAskQuestion = () => {
    setCurrentView('ask-question');
    setSearchQuery('');
    navigate('/talks');
  };

  const handleBack = () => {
    navigate('/talks');
    setCurrentView('home');
    setSelectedQuestion(null);
  };

  const handleShare = (question: TalkQuestion) => {
    const shareUrl = `${window.location.origin}/talks/${question.id}`;
    shareQuestion(
      question,
      shareUrl,
      (message) => showSnackbar(message, 'success'),
      (message) => showSnackbar(message, 'error'),
    );
  };
  const handleAddAnswer = (questionId: number, content: string) => {
    const newAnswer = addAnswer(questionId, content);

    if (activeQuestion && activeQuestion.id === questionId) {
      setSelectedQuestion({
        ...activeQuestion,
        answers: [...(activeQuestion.answers ?? []), newAnswer],
      });
    }
  };

  const handleSubmitQuestion = (title: string, body: string) => {
    const newQuestion = addQuestion(title, body);
    setSelectedQuestion(newQuestion);

    setTimeout(() => {
      setCurrentView('question-detail');
      navigate(`/talks/${newQuestion.id}`);
    }, 1000);
  };

  return (
    <>
      {notFound && questionId && (
        <div className="max-w-4xl mx-auto px-6 py-4 text-[#EF4444]">
          Question not found. It may have been removed.
        </div>
      )}
      <ViewRouter
        currentView={activeView}
        searchResults={searchResults}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        selectedQuestion={activeQuestion}
        onQuestionClick={handleQuestionClick}
        onAskQuestion={handleAskQuestion}
        onBack={handleBack}
        onShare={handleShare}
        onAddAnswer={handleAddAnswer}
        onSubmitQuestion={handleSubmitQuestion}
        onShowSnackbar={showSnackbar}
      />

      {snackbar.visible && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={hideSnackbar}
        />
      )}
    </>
  );
}
