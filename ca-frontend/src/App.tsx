import { useState } from 'react';

import { AskQuestion } from './components/AskQuestion';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { QuestionDetail } from './components/QuestionDetail';
import { SearchView } from './components/SearchView';
import { Snackbar } from './components/Snackbar';
import { SplashScreen } from './components/SplashScreen';
import { sampleQuestions, unansweredQuestions } from './data/sampleData';
import { ViewType, Question, Answer } from './types';

interface SnackbarState {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('splash');
  const [questions, setQuestions] = useState<Question[]>([...sampleQuestions, ...unansweredQuestions]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    type: 'success',
    visible: false
  });

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ message, type, visible: true });
  };

  const hideSnackbar = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  const handleSplashComplete = () => {
    setCurrentView('home');
  };

  const handleQuestionClick = (question: Question) => {
    // Find the latest version of the question from state
    const currentQuestion = questions.find(q => q.id === question.id);
    setSelectedQuestion(currentQuestion || question);
    setCurrentView('question-detail');
    setSearchQuery('');
  };

  const handleAskQuestion = () => {
    setCurrentView('ask-question');
    setSearchQuery('');
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedQuestion(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentView('search');
    } else {
      setCurrentView('home');
    }
  };

  const handleContactUs = () => {
    const mailto = 'mailto:ca.campusarena@gmail.com?subject=Campus%20Arena%20Support';
    window.location.href = mailto;
  };

  const handleShare = (question: Question) => {
    const shareText = `Check out this question on Campus Arena: ${question.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Campus Arena Question',
        text: shareText,
        url: window.location.href
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showSnackbar('Question link copied to clipboard!', 'success');
    }).catch(() => {
      showSnackbar('Failed to copy to clipboard', 'error');
    });
  };

  const handleAddAnswer = (questionId: string, content: string) => {
    const newAnswer: Answer = {
      id: `${questionId}-${Date.now()}`,
      content,
      timestamp: 'Just now'
    };

    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === questionId
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      )
    );

    // Update selected question as well
    if (selectedQuestion && selectedQuestion.id === questionId) {
      setSelectedQuestion({
        ...selectedQuestion,
        answers: [...selectedQuestion.answers, newAnswer]
      });
    }
  };

  const handleSubmitQuestion = (title: string, body: string) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      title,
      body: body || undefined,
      timestamp: 'Just now',
      answers: []
    };

    setQuestions(prev => [newQuestion, ...prev]);
    setSelectedQuestion(newQuestion);
    
    // Navigate to the newly created question detail
    setTimeout(() => {
      setCurrentView('question-detail');
    }, 1000);
  };

  return (
    <>
      {currentView === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentView !== 'splash' && currentView !== 'question-detail' && currentView !== 'ask-question' && (
        <>
          <Header
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onContactUs={handleContactUs}
          />
          {currentView === 'home' && (
            <HomeView
              onQuestionClick={handleQuestionClick}
              allQuestions={questions}
              onAskQuestion={handleAskQuestion}
              onShare={handleShare}
            />
          )}
          {currentView === 'search' && (
            <SearchView
              questions={questions}
              searchQuery={searchQuery}
              onQuestionClick={handleQuestionClick}
              onAskQuestion={handleAskQuestion}
              onShare={handleShare}
            />
          )}
        </>
      )}

      {currentView === 'question-detail' && selectedQuestion && (
        <QuestionDetail
          question={selectedQuestion}
          onBack={handleBack}
          onAddAnswer={handleAddAnswer}
          onShowSnackbar={showSnackbar}
        />
      )}

      {currentView === 'ask-question' && (
        <AskQuestion
          onBack={handleBack}
          onSubmit={handleSubmitQuestion}
          onShowSnackbar={showSnackbar}
        />
      )}

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
