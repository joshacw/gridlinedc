export type QuizStage = "welcome" | "quiz" | "contact";

export interface Question {
  id: number;
  text: string;
  bandId: string;
}

export interface Band {
  id: string;
  label: string;
  questionIds: number[];
}

export interface ContactFormData {
  firstName: string;
  facilityName: string;
  email: string;
  country: string;
}

export interface RatingTier {
  label: string;
  message: string;
}

export interface CompatibilityScoreProps {
  webhookUrl?: string;
}

export interface WebhookPayload {
  firstName: string;
  facilityName: string;
  email: string;
  country: string;
  score: number;
  scoreLabel: string;
  band1Score: number;
  band2Score: number;
  band3Score: number;
  answers: Record<string, boolean>;
  submittedAt: string;
}
