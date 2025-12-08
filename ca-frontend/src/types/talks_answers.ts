export interface TalkAnswer {
  id: number;
  questionId: number;
  content: string;
  createdAt: string;
  userId?: string | null;
}

export type Answer = TalkAnswer;
