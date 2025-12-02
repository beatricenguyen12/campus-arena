import { Question } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: '1',
    title: "Who's the better professor for CS 101 — Chandler or Ross?",
    body: "I'm taking CS 101 next semester and want less workload. Any recommendations?",
    timestamp: '1h ago',
    answers: [
      {
        id: '1a',
        content: "If you're trying to avoid heavy workloads, Chandler is the way to go. His assignments are lighter and he curves generously.",
        timestamp: '1h ago'
      },
      {
        id: '1b',
        content: "Bro, take Chandler. Ross made us write a 6-page essay on recursion. I'm still traumatized.",
        timestamp: '2h ago'
      }
    ]
  },
  {
    id: '2',
    title: "Maple Hall or Willow Hall for freshmen?",
    body: "Looking for on-campus housing recommendations. Which one is better?",
    timestamp: '3h ago',
    answers: [
      {
        id: '2a',
        content: "Maple Hall = social and loud. Willow Hall = quiet and clean. Choose based on your vibe.",
        timestamp: '3h ago'
      },
      {
        id: '2b',
        content: "Maple is fun but noisy. Willow has way better AC.",
        timestamp: '4h ago'
      }
    ]
  },
  {
    id: '3',
    title: "How difficult is Data Structures with Professor Janice?",
    timestamp: '7h ago',
    answers: [
      {
        id: '3a',
        content: "Janice is strict but fair. Weekly coding assignments. Great fundamentals if you keep up.",
        timestamp: '7h ago'
      },
      {
        id: '3b',
        content: "She's great but not an easy A. Also she yells 'OH MY GOD' when someone forgets code comments 😭",
        timestamp: '8h ago'
      }
    ]
  }
];

export const unansweredQuestions: Question[] = [
  {
    id: '4',
    title: "What's the cheapest place near campus to buy used textbooks?",
    timestamp: '2h ago',
    answers: []
  }
];
