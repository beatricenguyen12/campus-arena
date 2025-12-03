import { useCallback, useState } from 'react';

import { sampleQuestions, unansweredQuestions } from '@/data/sampleData';
import { TalkAnswer, TalkQuestion } from '@/types';

const withAnswerArray = (question: TalkQuestion): TalkQuestion => ({
  ...question,
  answers: question.answers ?? [],
});

export function useQuestions() {
  const [questions, setQuestions] = useState<TalkQuestion[]>([
    ...sampleQuestions.map(withAnswerArray),
    ...unansweredQuestions.map(withAnswerArray),
  ]);

  const findQuestionById = useCallback(
    (id: number) => questions.find((q) => q.id === id) ?? null,
    [questions],
  );

  const addAnswer = useCallback((questionId: number, content: string) => {
    const allAnswers = questions.flatMap((question) => question.answers ?? []);
    const nextAnswerId =
      allAnswers.length > 0
        ? Math.max(...allAnswers.map((answer) => answer.id)) + 1
        : 1;

    const newAnswer: TalkAnswer = {
      id: nextAnswerId,
      questionId,
      content,
      createdAt: new Date().toISOString(),
    };

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, answers: [...(q.answers ?? []), newAnswer] }
          : q,
      ),
    );

    return newAnswer;
  }, [questions]);

  const addQuestion = useCallback((title: string, body?: string) => {
    const nextQuestionId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;

    const newQuestion: TalkQuestion = {
      id: nextQuestionId,
      title,
      body: body?.trim() ? body : null,
      createdAt: new Date().toISOString(),
      answers: [],
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    return newQuestion;
  }, [questions]);

  const buildShareText = useCallback(
    (question: TalkQuestion) =>
      `Check out this question on Campus Arena: ${question.title}`,
    [],
  );

  const shareQuestion = useCallback(
    async (
      question: TalkQuestion,
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
