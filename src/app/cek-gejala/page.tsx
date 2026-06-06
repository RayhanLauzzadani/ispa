"use client";
// ============================================================
// Cek Gejala Page — "/cek-gejala" (Protected)
// ============================================================
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SYMPTOM_OPTIONS } from "@/types";
import { analyzeRisk } from "@/lib/riskRules";
import toast from "react-hot-toast";

export default function CekGejalaPage() {
  return (
    <ProtectedRoute>
      <CekGejalaContent />
    </ProtectedRoute>
  );
}

function CekGejalaContent() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [durationDays, setDurationDays] = useState<number>(1);

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedSymptoms.length === 0) {
      toast.error("Pilih minimal 1 gejala");
      return;
    }

    if (durationDays < 1) {
      toast.error("Lama gejala minimal 1 hari");
      return;
    }

    // Run rule-based analysis
    const result = analyzeRisk(selectedSymptoms, durationDays);

    // Encode data into URL params for the /hasil page
    const params = new URLSearchParams({
      symptoms: selectedSymptoms.join(","),
      duration: durationDays.toString(),
      risk: result.riskLevel,
      rec: result.recommendation,
    });

    router.push(`/hasil?${params.toString()}`);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="animate-fade-in-up mb-6 text-2xl font-bold text-slate-800">
          Cek Gejala ISPA
        </h1>

        {/* ---- Poster Edukasi ISPA ---- */}
        <div className="animate-fade-in-up delay-100 mb-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3">
            <h2 className="text-center text-sm font-semibold text-white">
              📋 Poster Edukasi ISPA
            </h2>
          </div>
          <div className="p-4">
            <Image
              src="/poster-ispa.jpeg"
              alt="Poster Edukasi ISPA - Kenali gejala ISPA, cara pencegahan, dan etika batuk bersin yang benar"
              width={800}
              height={1000}
              className="w-full rounded-xl"
              priority
            />
          </div>
        </div>

        {/* ---- Form ---- */}
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up delay-200 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Symptom checklist */}
          <h3 className="mb-4 text-base font-semibold text-slate-700">
            Pilih gejala yang dialami anak:
          </h3>
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {SYMPTOM_OPTIONS.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <label
                  key={symptom}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                    isSelected
                      ? "border-blue-300 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSymptom(symptom)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span
                    className={`text-sm font-medium ${isSelected ? "text-blue-700" : "text-slate-600"}`}
                  >
                    {symptom}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Duration input */}
          <div className="mb-8">
            <label
              htmlFor="duration"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Lama gejala (hari)
            </label>
            <input
              id="duration"
              type="number"
              min={1}
              max={365}
              required
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:w-48"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:w-auto sm:px-10"
          >
            Proses Hasil
          </button>
        </form>
      </main>
    </>
  );
}
