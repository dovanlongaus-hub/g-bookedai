export interface LearningSession {
  id: string;
  bookingId: string;
  transcriptUrl?: string;
  summary?: string;
  qaJson?: QAItem[];
  improvementPlan?: ImprovementItem[];
  nextCta?: string;
  createdAt: Date;
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface ImprovementItem {
  area: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}
