"use client";
// ============================================================
// Dashboard Page — "/dashboard" (Protected)
// ============================================================
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import RiskBadge from "@/components/RiskBadge";
import { useAuth } from "@/contexts/AuthContext";
import { getHistories } from "@/lib/firestore";
import type { HistoryRecord } from "@/types";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [lastCheck, setLastCheck] = useState<HistoryRecord | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      if (!user) return;
      try {
        const records = await getHistories(user.uid);
        if (records.length > 0) setLastCheck(records[0]);
      } catch {
        // silently fail — dashboard still usable without history
      } finally {
        setLoadingHistory(false);
      }
    }
    fetchLatest();
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Greeting */}
        <div className="animate-fade-in-up mb-8">
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Halo, Orang Tua Hebat 👋
          </h1>
          <p className="mt-1 text-slate-500">
            Selamat datang di ISPA Care Family
          </p>
        </div>

        {/* Shortcut Cards */}
        <div className="animate-fade-in-up delay-100 mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ShortcutCard
            href="/cek-gejala"
            icon="🩺"
            title="Cek Gejala Baru"
            description="Periksa gejala ISPA anak sekarang"
            color="bg-blue-50 border-blue-100"
            hoverColor="hover:border-blue-300"
          />
          <ShortcutCard
            href="/riwayat"
            icon="📋"
            title="Lihat Riwayat"
            description="Cek hasil pemeriksaan sebelumnya"
            color="bg-green-50 border-green-100"
            hoverColor="hover:border-green-300"
          />
          <ShortcutCard
            href="/edukasi"
            icon="📚"
            title="Ide Edukasi ISPA Anak"
            description="Video & media belajar tentang ISPA"
            color="bg-amber-50 border-amber-100"
            hoverColor="hover:border-amber-300"
          />
        </div>

        {/* Last check summary */}
        <div className="animate-fade-in-up delay-200">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Pemeriksaan Terakhir
          </h2>

          {loadingHistory ? (
            <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-6">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
              <span className="text-sm text-slate-500">Memuat...</span>
            </div>
          ) : lastCheck ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">
                    {lastCheck.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {lastCheck.symptoms.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Lama gejala:{" "}
                    <span className="font-medium text-slate-700">
                      {lastCheck.durationDays} hari
                    </span>
                  </p>
                </div>
                <RiskBadge level={lastCheck.riskLevel} />
              </div>
              <p className="mt-3 text-sm text-slate-600">
                💡 {lastCheck.recommendation}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-8 text-center">
              <p className="text-sm text-slate-500">
                Belum ada riwayat pemeriksaan
              </p>
              <Link
                href="/cek-gejala"
                className="mt-3 inline-block rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700"
              >
                Mulai Cek Gejala
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ---- ShortcutCard ----
function ShortcutCard({
  href,
  icon,
  title,
  description,
  color,
  hoverColor,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl border ${color} ${hoverColor} p-6 transition-all hover:-translate-y-0.5 hover:shadow-md`}
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </Link>
  );
}
