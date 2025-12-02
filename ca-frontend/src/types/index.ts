export interface Question {
  id: string;
  title: string;
  body?: string;
  timestamp: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  content: string;
  timestamp: string;
}

export type ViewType = 'splash' | 'home' | 'question-detail' | 'ask-question' | 'search';
export type TabType = 'answered' | 'needs-answers';
