export type QuizStage = "welcome" | "quiz" | "contact";

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

export interface CompatibilityScoreProps {
  webhookUrl?: string;
}
