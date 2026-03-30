import type { Band, RatingTier } from "./types";
import { BANDS, RATINGS, DEFAULT_RATING } from "./questions";

export function computeBandScore(band: Band, answers: Record<number, boolean>): number {
  const yesCount = band.questionIds.filter((id) => answers[id] === true).length;
  const total = band.questionIds.length;

  if (total === 2) {
    // Band 1 — Thesis: Both=2, One=1, None=0
    return yesCount;
  }
  if (total === 3) {
    // Band 2 — Structure: All=2, Two=1, ≤1=0
    if (yesCount === 3) return 2;
    if (yesCount === 2) return 1;
    return 0;
  }
  // Band 3 — Quality (4 questions): ≥3=2, Two=1, ≤1=0
  if (yesCount >= 3) return 2;
  if (yesCount === 2) return 1;
  return 0;
}

export function computeAllScores(answers: Record<number, boolean>): {
  band1Score: number;
  band2Score: number;
  band3Score: number;
  total: number;
} {
  const band1Score = computeBandScore(BANDS[0], answers);
  const band2Score = computeBandScore(BANDS[1], answers);
  const band3Score = computeBandScore(BANDS[2], answers);
  return { band1Score, band2Score, band3Score, total: band1Score + band2Score + band3Score };
}

export function getRating(score: number): RatingTier {
  return RATINGS[score] ?? DEFAULT_RATING;
}
