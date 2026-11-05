export type DimensionKey =
  | 'care_repair'
  | 'curiosity_exploration'
  | 'memory_story'
  | 'independence_play';

export interface AnswerOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  scores: Record<DimensionKey, number>;
  observation: string; // The specific observation for "Why this universe chose you"
}

export interface Question {
  id: number;
  prompt: string;
  contextHint: string;
  options: AnswerOption[];
}

export interface Profile {
  id: string;
  title: string;
  universeCode: string;
  universeName: string;
  summary: string;
  jobDescription: string;
  specialAbility: string;
  occupationalHazard: string;
  officeHours: string;
  currentAssignment: string;
  vector: Record<DimensionKey, number>;
  emblemKey: string;
  serialPrefix: string;
}

export type QuizStep = 'landing' | 'quiz' | 'processing' | 'result';

export interface UserAnswers {
  [questionId: number]: 'A' | 'B' | 'C' | 'D';
}
