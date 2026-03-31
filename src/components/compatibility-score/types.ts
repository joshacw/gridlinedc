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
  organisationName: string;
  facilityName: string;
  facilityLocation: string;
  facilityPlaceId: string;
  facilitySizeMW: string;
  firstName: string;
  role: string;
  email: string;
  phoneNumber: string;
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
  organisationName: string;
  facilityName: string;
  facilityLocation: string;
  facilitySizeMW: string;
  firstName: string;
  role: string;
  email: string;
  phoneNumber: string;
  country: string;
  score: number;
  scoreLabel: string;
  band1Score: number;
  band2Score: number;
  band3Score: number;
  answers: Record<string, boolean>;
  submittedAt: string;
}
