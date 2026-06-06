"use client";
// ============================================================
// Hasil Page — "/hasil" (Protected)
// Auto-saves result to Firestore on load — no manual confirm.
// ============================================================
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import RiskBadge from "@/components/RiskBadge";
import { useAuth } from "@/contexts/AuthContext";
import { saveHistory } from "@/lib/firestore";
import type { RiskLevel } from "@/types";
import toast from "react-hot-toast";

export default function HasilPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          </div>
        }
      >
        <HasilContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function HasilContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const hasSaved = useRef(false);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "error">(
    "saving"
  );

  // Read data from URL params
  const symptomsRaw = searchParams.get("symptoms") ?? "";
  const symptoms = symptomsRaw ? symptomsRaw.split(",") : [];
  const durationDays = Number(searchParams.get("duration") ?? "0");
  const riskLevel = (searchParams.get("risk") ?? "AMAN") as RiskLevel;
  const recommendation = searchParams.get("rec") ?? "";

  const hasData = symptoms.length > 0 && durationDays > 0;

  // Auto-save on mount (once)
  useEffect(() => {
    if (!user || !hasData || hasSaved.current) return;
    hasSaved.current = true;

    saveHistory(user.uid, {
      symptoms,
      durationDays,
      riskLevel,
      recommendation,
    })
      .then(() => {
        setSaveStatus("saved");
      })
      .catch(() => {
        setSaveStatus("error");
        toast.error("Gagal menyimpan riwayat. Coba lagi nanti.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // No data — show fallback
  if (!hasData) {
    return (
      <>
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="text-center">
            <p className="mb-4 text-slate-500">Tidak ada data hasil.</p>
            <Link
              href="/cek-gejala"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white"
            >
              Cek Gejala
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Determine card colours
  const cardStyles: Record<RiskLevel, string> = {
    AMAN: "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
    WASPADA: "border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50",
    BAHAYA: "border-red-200 bg-gradient-to-br from-red-50 to-rose-50",
  };

  const iconMap: Record<RiskLevel, string> = {
    AMAN: "✅",
    WASPADA: "⚠️",
    BAHAYA: "🚨",
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="animate-fade-in-up mb-6 text-2xl font-bold text-slate-800">
          Hasil Analisis
        </h1>

        {/* Result Card */}
        <div
          className={`animate-fade-in-up delay-100 rounded-2xl border ${cardStyles[riskLevel]} p-6 sm:p-8`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="text-4xl">{iconMap[riskLevel]}</span>
            <div>
              <RiskBadge level={riskLevel} />
              <p className="mt-2 text-lg font-semibold text-slate-800">
                {recommendation}
              </p>
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-slate-600">
              Gejala yang dipilih:
            </p>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Duration */}
          <p className="text-sm text-slate-600">
            Lama gejala:{" "}
            <span className="font-semibold text-slate-800">
              {durationDays} hari
            </span>
          </p>
        </div>

        {/* Auto-save status */}
        <div className="animate-fade-in-up delay-150 mt-4">
          {saveStatus === "saving" && (
            <p className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-blue-200 border-t-blue-500" />
              Menyimpan ke riwayat...
            </p>
          )}
          {saveStatus === "saved" && (
            <p className="text-xs text-green-600">
              ✅ Hasil otomatis tersimpan ke riwayat
            </p>
          )}
          {saveStatus === "error" && (
            <p className="text-xs text-red-500">
              ⚠️ Gagal menyimpan riwayat
            </p>
          )}
        </div>

        {/* Disclaimer */}
        <div className="animate-fade-in-up delay-200 mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <p className="text-xs leading-relaxed text-blue-700">
            ⚕️ <strong>Catatan:</strong> Hasil ini bukan diagnosis medis, hanya
            panduan awal berdasarkan gejala yang diinput. Untuk diagnosis dan
            penanganan lebih lanjut, konsultasikan dengan tenaga kesehatan
            profesional.
          </p>
        </div>

        {/* Actions */}
        <div className="animate-fade-in-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => router.push("/cek-gejala")}
            className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
          >
            🔄 Cek Lagi
          </button>
          <button
            onClick={() => router.push("/riwayat")}
            className="rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            📋 Lihat Riwayat
          </button>
        </div>
      </main>
    </>
  );
}
