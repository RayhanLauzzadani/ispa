// ============================================================
// ISPA Care Family — Type Definitions
// ============================================================

/** Risk levels returned by the rule-based engine, ordered by severity. */
export type RiskLevel = "AMAN" | "WASPADA" | "BAHAYA";

/** Available symptom options presented in the checklist form. */
export const SYMPTOM_OPTIONS = [
  "Batuk",
  "Pilek",
  "Demam",
  "Sesak napas",
  "Sakit tenggorokan",
] as const;

export type Symptom = (typeof SYMPTOM_OPTIONS)[number];

/** Result produced by the rule-based risk analysis engine. */
export interface RiskResult {
  riskLevel: RiskLevel;
  recommendation: string;
}

/** Data submitted from the symptom-check form. */
export interface SymptomCheckData {
  symptoms: string[];
  durationDays: number;
}

/** Full analysis result including original inputs + risk assessment. */
export interface AnalysisResult extends SymptomCheckData, RiskResult {}

/** Document stored in Firestore at users/{userId}/histories/{historyId}. */
export interface HistoryRecord extends AnalysisResult {
  id?: string;
  createdAt: Date;
}

/** User profile stored in Firestore at users/{userId}. */
export interface UserProfile {
  name: string;
  email: string;
  createdAt: Date;
}
