// ============================================================
// EmptyState — Shown when a list has no data
// ============================================================
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  title = "Belum ada data",
  description = "Belum ada riwayat pemeriksaan",
  actionLabel = "Mulai Cek Gejala",
  actionHref = "/cek-gejala",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 px-6 py-16 text-center">
      <div className="mb-4 text-5xl">📋</div>
      <h3 className="mb-1 text-lg font-semibold text-slate-700">{title}</h3>
      <p className="mb-6 text-sm text-slate-500">{description}</p>
      <Link
        href={actionHref}
        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
