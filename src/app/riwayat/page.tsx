"use client";
// ============================================================
// Riwayat Page — "/riwayat" (Protected)
// ============================================================
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import RiskBadge from "@/components/RiskBadge";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/contexts/AuthContext";
import { getHistories } from "@/lib/firestore";
import type { HistoryRecord } from "@/types";

export default function RiwayatPage() {
  return (
    <ProtectedRoute>
      <RiwayatContent />
    </ProtectedRoute>
  );
}

function RiwayatContent() {
  const { user } = useAuth();
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (!user) return;
      try {
        const data = await getHistories(user.uid);
        setRecords(data);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="animate-fade-in-up mb-6 text-2xl font-bold text-slate-800">
          Riwayat Pemeriksaan
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              <p className="text-sm text-slate-500">Memuat riwayat...</p>
            </div>
          </div>
        ) : records.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {records.map((rec, idx) => {
              const params = new URLSearchParams({
                symptoms: rec.symptoms.join(","),
                duration: rec.durationDays.toString(),
                risk: rec.riskLevel,
                rec: rec.recommendation,
                fromHistory: "1", // Penanda ini dari history (opsional)
              });
              return (
                <Link
                  href={`/hasil?${params.toString()}`}
                  key={rec.id ?? idx}
                  className="group block animate-fade-in-up rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    {/* Date */}
                    <p className="text-xs font-medium text-slate-400">
                      {rec.createdAt.toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {/* Symptoms */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {rec.symptoms.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <p className="mt-2 text-sm text-slate-500">
                      Lama gejala:{" "}
                      <span className="font-medium text-slate-700">
                        {rec.durationDays} hari
                      </span>
                    </p>

                    {/* Recommendation */}
                    <p className="mt-1 text-sm text-slate-600">
                      💡 {rec.recommendation}
                    </p>
                  </div>

                  <RiskBadge level={rec.riskLevel} />
                </div>
              </Link>
            )})}
          </div>
        )}
      </main>
    </>
  );
}
