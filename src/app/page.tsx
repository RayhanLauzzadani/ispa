"use client";
// ============================================================
// Landing Page — "/" (public marketing page)
// Redirects logged-in users to /dashboard
// ============================================================
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // Show nothing while checking auth (prevents flash of landing page)
  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ---- Hero Section ---- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-4 py-20 text-white sm:py-28">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="animate-fade-in-up text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Monitor Kesehatan Anak,{" "}
              <span className="text-blue-200">Lindungi Keluarga</span>
            </h1>
            <p className="animate-fade-in-up delay-100 mt-5 max-w-xl text-lg text-blue-100 sm:text-xl">
              Cek gejala ISPA anak secara cepat dan dapatkan rekomendasi
              tindakan awal.
            </p>
            <div className="animate-fade-in-up delay-200 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/cek-gejala"
                className="rounded-2xl bg-white px-8 py-3.5 text-center text-base font-semibold text-blue-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Mulai Cek Gejala
              </Link>
              <Link
                href="/register"
                className="rounded-2xl border-2 border-white/30 px-8 py-3.5 text-center text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>

          {/* Family Illustration */}
          <div className="animate-fade-in-up delay-300 flex flex-1 items-center justify-center">
            <div className="overflow-hidden rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
              <Image
                src="/family-illustration.png"
                alt="Ilustrasi keluarga sehat dengan anak usia sekolah"
                width={400}
                height={400}
                className="h-auto w-64 rounded-2xl sm:w-80"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Benefits Section ---- */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-slate-800">
            Kenapa ISPA Care Family?
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-slate-500">
            Solusi sederhana untuk membantu orang tua memantau gejala ISPA anak.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <BenefitCard
              icon="🎯"
              title="Mudah Digunakan"
              description="Cukup centang gejala dan isi lama hari. Tanpa perlu akun medis atau pengetahuan khusus."
              delay="delay-100"
            />
            <BenefitCard
              icon="⚡"
              title="Hasil Cepat"
              description="Dapatkan analisis risiko instan beserta rekomendasi tindakan awal dalam hitungan detik."
              delay="delay-200"
            />
            <BenefitCard
              icon="📊"
              title="Riwayat Tersimpan"
              description="Semua hasil pemeriksaan tersimpan aman dan bisa diakses kapan saja untuk konsultasi dokter."
              delay="delay-300"
            />
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-slate-100 bg-white px-4 py-8 text-center text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} ISPA Care Family. Dibuat untuk keperluan edukasi.</p>
        <p className="mt-1">
          Hasil bukan diagnosis medis, hanya panduan awal berdasarkan gejala.
        </p>
      </footer>
    </>
  );
}

// ---- BenefitCard sub-component ----
function BenefitCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className={`animate-fade-in-up ${delay} group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl transition-colors group-hover:bg-blue-100">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}
