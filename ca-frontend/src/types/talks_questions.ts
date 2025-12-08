import { TalkAnswer } from './talks_answers';

export interface TalkQuestion {
  id: number;
  title: string;
  body?: string | null;
  createdAt: string;
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
  userId?: string | null;
  answers?: TalkAnswer[];
}

export type Question = TalkQuestion;
