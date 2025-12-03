import { useCallback, useState } from 'react';

import { sampleQuestions, unansweredQuestions } from '@/data/sampleData';
import { Answer, Question } from '@/types';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([
    ...sampleQuestions,
    ...unansweredQuestions,
  ]);

  const findQuestionById = useCallback(
    (id: string) => questions.find((q) => q.id === id) ?? null,
    [questions],
  );

  const addAnswer = useCallback((questionId: string, content: string) => {
    const newAnswer: Answer = {
      id: `${questionId}-${Date.now()}`,
      content,
      timestamp: 'Just now',
    };

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q,
      ),
    );

    return newAnswer;
  }, []);

  const addQuestion = useCallback((title: string, body?: string) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      title,
      body: body || undefined,
      timestamp: 'Just now',
      answers: [],
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    return newQuestion;
  }, []);

  const buildShareText = useCallback(
    (question: Question) =>
      `Check out this question on Campus Arena: ${question.title}`,
    [],
  );

  const shareQuestion = useCallback(
    async (
      question: Question,
      shareUrl: string,
      onSuccess: (message: string) => void,
      onError: (message: string) => void,
    ) => {
      const shareText = buildShareText(question);
      const payloadText = `${shareText}\n${shareUrl}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Campus Arena Question',
            text: shareText,
            url: shareUrl,
          });
          onSuccess('Shared successfully');
          return;
        } catch {
          // fall back to clipboard
        }
      }

      try {
        await navigator.clipboard.writeText(payloadText);
        onSuccess('Question link copied to clipboard!');
      } catch {
        onError('Failed to copy to clipboard');
      }
    },
    [buildShareText],
  );

  return {
    questions,
    findQuestionById,
    addAnswer,
    addQuestion,
    shareQuestion,
  };
}
