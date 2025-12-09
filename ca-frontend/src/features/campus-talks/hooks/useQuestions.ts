import { useCallback, useEffect, useState } from 'react';

import { sampleQuestions, unansweredQuestions } from '@/data/sampleData';
import { supabase } from '@/lib/supabaseClient';
import { TalkAnswer, TalkQuestion } from '@/types';

const withAnswerArray = (question: TalkQuestion): TalkQuestion => ({
  ...question,
  answers: question.answers ?? [],
});

const sampleFallback = [
  ...sampleQuestions.map(withAnswerArray),
  ...unansweredQuestions.map(withAnswerArray),
];

type SupabaseQuestionRow = {
  id: number;
  title: string;
  body?: string | null;
  created_at: string;
  user_id?: string | null;
  tag:
    | 'academics'
    | 'orientation_campus_life'
    | 'housing'
    | 'jobs_internships'
    | 'clubs_orgs'
    | 'life_local_area'
    | 'international_students'
    | 'starter_pack'
    | 'other';
};

type SupabaseAnswerRow = {
  id: number;
  question_id: number;
  content: string;
  created_at: string;
  user_id?: string | null;
};

export function useQuestions() {
  const initialQuestions = supabase ? [] : sampleFallback;
  const [questions, setQuestions] = useState<TalkQuestion[]>(initialQuestions);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      if (!supabase) {
        setQuestions(sampleFallback);
        return;
      }

      const { data: questionRows, error: questionError } = await supabase
        .from('talks_questions')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: answerRows, error: answerError } = await supabase
        .from('talks_answers')
        .select('*');

      if (questionError || answerError) {
        console.error('Supabase fetch error', questionError ?? answerError);
        if (isMounted) {
          setQuestions(sampleFallback);
        }
        return;
      }

      const answersByQuestion = new Map<number, TalkAnswer[]>();
      (answerRows ?? []).forEach((answer: SupabaseAnswerRow) => {
        const mappedAnswer: TalkAnswer = {
          id: answer.id,
          questionId: answer.question_id,
          content: answer.content,
          createdAt: answer.created_at,
          userId: answer.user_id ?? null,
        };

        const existing = answersByQuestion.get(answer.question_id) ?? [];
        answersByQuestion.set(answer.question_id, [...existing, mappedAnswer]);
      });

      const mappedQuestions =
        questionRows?.map((question: SupabaseQuestionRow) => ({
          id: question.id,
          title: question.title,
          body: question.body ?? null,
          createdAt: question.created_at,
          userId: question.user_id ?? null,
          tag: question.tag,
          answers: answersByQuestion.get(question.id) ?? [],
        })) ?? [];

      if (!isMounted) return;

      setQuestions(
        mappedQuestions.length > 0
          ? mappedQuestions.map(withAnswerArray)
          : sampleFallback,
      );
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  const findQuestionById = useCallback(
    (id: number) => questions.find((q) => q.id === id) ?? null,
    [questions],
  );

  const addAnswer = useCallback(
    async (questionId: number, content: string) => {
      if (supabase) {
        const { data, error } = await supabase
          .from('talks_answers')
          .insert({
            question_id: questionId,
            content,
          })
          .select()
          .single();

        if (error || !data) {
          console.error('Supabase insert answer failed', error);
          throw new Error('Failed to save answer');
        }

        const mapped: TalkAnswer = {
          id: data.id,
          questionId: data.question_id,
          content: data.content,
          createdAt: data.created_at,
          userId: data.user_id ?? null,
        };

        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === questionId
              ? { ...q, answers: [...(q.answers ?? []), mapped] }
              : q,
          ),
        );

        return mapped;
      }

      const allAnswers = questions.flatMap((question) => question.answers ?? []);
      const nextAnswerId =
        allAnswers.length > 0
          ? Math.max(...allAnswers.map((answer) => answer.id)) + 1
          : 1;

      const fallbackAnswer: TalkAnswer = {
        id: nextAnswerId,
        questionId,
        content,
        createdAt: new Date().toISOString(),
      };

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId
            ? { ...q, answers: [...(q.answers ?? []), fallbackAnswer] }
            : q,
        ),
      );

      return fallbackAnswer;
    },
    [questions],
  );

  const addQuestion = useCallback(
    async (title: string, body: string | undefined, tag: TalkQuestion['tag']) => {
      const trimmedBody = body?.trim() ?? '';

      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('talks_questions')
            .insert({
              title,
              body: trimmedBody ? trimmedBody : null,
              tag,
            })
            .select()
            .single();

          if (!error && data) {
            const mapped: TalkQuestion = {
              id: data.id,
              title: data.title,
              body: data.body ?? null,
              createdAt: data.created_at,
              userId: data.user_id ?? null,
              tag: data.tag,
              answers: [],
            };

            setQuestions((prev) => [mapped, ...prev]);
            return mapped;
          }
        } catch (err) {
          console.error('Supabase insert question failed', err);
        }
      }

      const nextQuestionId =
        questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;

      const fallbackQuestion: TalkQuestion = {
        id: nextQuestionId,
        title,
        body: trimmedBody ? trimmedBody : null,
        createdAt: new Date().toISOString(),
        tag,
        answers: [],
      };

      setQuestions((prev) => [fallbackQuestion, ...prev]);
      return fallbackQuestion;
    },
    [questions],
  );

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
