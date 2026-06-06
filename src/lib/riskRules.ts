// ============================================================
// Rule-Based ISPA Risk Analysis Engine
// ============================================================
// Priority order (highest → lowest):
//   1. BAHAYA  — duration > 7 days
//   2. WASPADA — duration 3–7 days OR "Sesak napas" selected
//   3. AMAN    — all else
// ============================================================

import type { RiskResult } from "@/types";

/**
 * Analyse user-reported symptoms and duration to produce a risk level
 * and an actionable recommendation.
 *
 * This is a pure function with no side-effects — safe to call anywhere.
 */
export function analyzeRisk(
  symptoms: string[],
  durationDays: number
): RiskResult {
  // --- Rule 1: BAHAYA (highest priority) ---
  if (durationDays > 7) {
    return {
      riskLevel: "BAHAYA",
      recommendation: "Segera ke Faskes/IGD",
    };
  }

  // --- Rule 2: WASPADA ---
  const hasSesakNapas = symptoms.includes("Sesak napas");
  if (durationDays > 3 || hasSesakNapas) {
    return {
      riskLevel: "WASPADA",
      recommendation: "Konsultasi di Puskesmas/Faskes Terdekat",
    };
  }

  // --- Rule 3: AMAN (default) ---
  return {
    riskLevel: "AMAN",
    recommendation: "Perawatan di rumah",
  };
}
