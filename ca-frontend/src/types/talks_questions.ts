import { TalkAnswer } from './talks_answers';

export interface TalkQuestion {
  id: number;
  title: string;
  body?: string | null;
  createdAt: string;
  answers?: TalkAnswer[];
}

export type Question = TalkQuestion;
