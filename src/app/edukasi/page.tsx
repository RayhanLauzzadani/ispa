"use client";
// ============================================================
// Edukasi Page — "/edukasi" (Protected)
// ============================================================
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EdukasiPage() {
  return (
    <ProtectedRoute>
      <EdukasiContent />
    </ProtectedRoute>
  );
}

function EdukasiContent() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        {/* ---- Page Header ---- */}
        <div className="animate-fade-in-up mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
            📚 Edukasi
          </span>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Ide Edukasi ISPA Anak
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
            Kumpulan materi edukasi untuk membantu orang tua dan anak memahami
            ISPA melalui media yang menyenangkan dan mudah dipahami.
          </p>
        </div>

        {/* ---- Section 1: Video Edukasi ---- */}
        <section className="animate-fade-in-up delay-100 mb-10">
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {/* Section Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-xl">
                🎬
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Video Edukasi ISPA
                </h2>
                <p className="text-xs text-slate-400">
                  Tonton video penjelasan tentang ISPA pada anak
                </p>
              </div>
            </div>

            {/* YouTube Embed — responsive 16:9 */}
            <div className="relative aspect-video w-full bg-slate-900">
              <iframe
                src="https://www.youtube.com/embed/SpuBrXTHoO4"
                title="Video Edukasi ISPA pada Anak"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Video description */}
            <div className="px-6 py-4">
              <p className="text-sm leading-relaxed text-slate-600">
                Video ini menjelaskan tentang Infeksi Saluran Pernapasan Akut
                (ISPA) pada anak, meliputi gejala, penyebab, pencegahan, dan
                penanganan awal yang tepat. Cocok untuk orang tua dan keluarga
                sebagai panduan edukasi kesehatan.
              </p>
            </div>
          </div>
        </section>

        {/* ---- Section 2: Board Game GESIT ---- */}
        <section className="animate-fade-in-up delay-200 mb-10">
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {/* Section Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-xl">
                🎲
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Board Game Edukasi &quot;GESIT&quot;
                </h2>
                <p className="text-xs text-slate-400">
                  Belajar tentang ISPA sambil bermain bersama keluarga
                </p>
              </div>
            </div>

            {/* Game instruction image */}
            <div className="p-4 sm:p-6">
              <Image
                src="/instruksi-ispa.jpeg"
                alt="Instruksi board game edukasi GESIT — aturan permainan dan cara bermain"
                width={1000}
                height={700}
                className="w-full rounded-xl"
                priority
              />
            </div>

            {/* Game description */}
            <div className="border-t border-slate-100 px-6 py-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Cara Bermain
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    1
                  </span>
                  Setiap tim menempatkan 2 pion di titik awal sudut papan
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    2
                  </span>
                  Putar spin untuk menentukan kategori kartu (Mudah, Menengah, Sulit)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    3
                  </span>
                  Baca dan jalankan instruksi yang ada di kartu
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
                    🏆
                  </span>
                  Tim pertama yang kedua pionnya sampai di pusat papan menjadi pemenang!
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Tips Card ---- */}
        <section className="animate-fade-in-up delay-300 mb-8">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <h3 className="mb-3 text-sm font-semibold text-blue-800">
              💡 Tips untuk Orang Tua
            </h3>
            <ul className="space-y-1.5 text-sm text-blue-700">
              <li>• Ajak anak menonton video edukasi bersama</li>
              <li>• Mainkan board game GESIT di akhir pekan sebagai kegiatan keluarga</li>
              <li>• Diskusikan gejala ISPA dengan bahasa yang mudah dipahami anak</li>
              <li>• Ajarkan etika batuk dan bersin yang benar sejak dini</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
