import { TalkAnswer, TalkQuestion } from '@/types';

const now = Date.now();

const hoursAgo = (hours: number) =>
  new Date(now - hours * 60 * 60 * 1000).toISOString();

const sampleAnswers: TalkAnswer[] = [
  {
    id: 1,
    questionId: 1,
    content:
      "If you're trying to avoid heavy workloads, Chandler is the way to go. His assignments are lighter and he curves generously.",
    createdAt: hoursAgo(1),
  },
  {
    id: 2,
    questionId: 1,
    content:
      "Bro, take Chandler. Ross made us write a 6-page essay on recursion. I'm still traumatized.",
    createdAt: hoursAgo(2),
  },
  {
    id: 3,
    questionId: 2,
    content:
      'Maple Hall = social and loud. Willow Hall = quiet and clean. Choose based on your vibe.',
    createdAt: hoursAgo(3),
  },
  {
    id: 4,
    questionId: 2,
    content: 'Maple is fun but noisy. Willow has way better AC.',
    createdAt: hoursAgo(4),
  },
  {
    id: 5,
    questionId: 3,
    content:
      'Janice is strict but fair. Weekly coding assignments. Great fundamentals if you keep up.',
    createdAt: hoursAgo(7),
  },
  {
    id: 6,
    questionId: 3,
    content:
      "She's great but not an easy A. Also she yells 'OH MY GOD' when someone forgets code comments 😭",
    createdAt: hoursAgo(8),
  },
];

const answersForQuestion = (questionId: number) =>
  sampleAnswers.filter((answer) => answer.questionId === questionId);

export const sampleQuestions: TalkQuestion[] = [
  {
    id: 1,
    title: "Who's the better professor for CS 101 — Chandler or Ross?",
    body: "I'm taking CS 101 next semester and want less workload. Any recommendations?",
    createdAt: hoursAgo(2),
    answers: answersForQuestion(1),
  },
  {
    id: 2,
    title: 'Maple Hall or Willow Hall for freshmen?',
    body: 'Looking for on-campus housing recommendations. Which one is better?',
    createdAt: hoursAgo(4),
    answers: answersForQuestion(2),
  },
  {
    id: 3,
    title: 'How difficult is Data Structures with Professor Janice?',
    createdAt: hoursAgo(8),
    answers: answersForQuestion(3),
  },
];

export const unansweredQuestions: TalkQuestion[] = [
  {
    id: 4,
    title: "What's the cheapest place near campus to buy used textbooks?",
    createdAt: hoursAgo(2),
    answers: [],
  },
];
