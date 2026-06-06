// ============================================================
// RiskBadge — Color-coded risk level badge
// ============================================================
import type { RiskLevel } from "@/types";

const badgeStyles: Record<RiskLevel, string> = {
  AMAN: "bg-green-100 text-green-700 border-green-200",
  WASPADA: "bg-amber-100 text-amber-700 border-amber-200",
  BAHAYA: "bg-red-100 text-red-700 border-red-200",
};

const badgeIcons: Record<RiskLevel, string> = {
  AMAN: "✅",
  WASPADA: "⚠️",
  BAHAYA: "🚨",
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyles[level]}`}
    >
      <span>{badgeIcons[level]}</span>
      {level}
    </span>
  );
}
