# 🩺 ISPA Care Family

Website kesehatan anak berbasis **rule-based** untuk mengecek gejala ISPA (Infeksi Saluran Pernapasan Akut). Dilengkapi dengan login/register, input gejala, hasil analisis risiko, dan riwayat pemeriksaan per user.

> ⚠️ **Disclaimer**: Hasil dari website ini **bukan diagnosis medis**. Hanya panduan awal berdasarkan gejala yang diinput.

## Tech Stack

| Teknologi | Fungsi |
|---|---|
| **Next.js 15** (App Router) | Framework React full-stack |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Firebase Auth** | Autentikasi email/password |
| **Firebase Firestore** | Database riwayat pemeriksaan |
| **Vercel** | Target hosting |

## Fitur

- ✅ Landing page informatif
- ✅ Login & Register email/password
- ✅ Dashboard dengan shortcut & ringkasan terakhir
- ✅ Form cek gejala ISPA dengan checklist
- ✅ Analisis risiko rule-based (AMAN / WASPADA / BAHAYA)
- ✅ Simpan hasil ke riwayat Firestore
- ✅ Halaman riwayat pemeriksaan
- ✅ Auth protection untuk halaman terproteksi
- ✅ Responsive design (mobile & desktop)

## Prasyarat

- **Node.js** v18 atau lebih baru
- **npm** v9 atau lebih baru
- **Firebase Project** dengan Authentication dan Firestore diaktifkan

## Cara Install

```bash
# 1. Clone repository
git clone <repository-url>
cd keperawatan-ispa

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Isi .env.local dengan konfigurasi Firebase Anda
```

## Setup Firebase

### 1. Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Klik **Add project** → beri nama project
3. Ikuti langkah pembuatan project

### 2. Aktifkan Authentication
1. Di Firebase Console → **Authentication** → **Sign-in method**
2. Aktifkan **Email/Password**

### 3. Aktifkan Firestore
1. Di Firebase Console → **Firestore Database** → **Create database**
2. Pilih **Start in test mode** (untuk development)
3. Pilih region terdekat

### 4. Dapatkan Config
1. Di Firebase Console → **Project Settings** → **General**
2. Scroll ke **Your apps** → klik ikon Web (`</>`)
3. Register app → copy config values
4. Paste ke file `.env.local`

### 5. Firestore Security Rules (Produksi)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /histories/{historyId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Menjalankan Project

```bash
# Development
npm run dev

# Build production
npm run build

# Start production
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deploy ke Vercel

### Via Vercel Dashboard

1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) → **New Project**
3. Import repository GitHub
4. Tambahkan environment variables dari `.env.local` ke Vercel:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Klik **Deploy**

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

## Struktur Project

```
src/
├── app/
│   ├── layout.tsx            # Root layout + providers
│   ├── page.tsx              # Landing page
│   ├── globals.css           # Tailwind + design tokens
│   ├── login/page.tsx        # Halaman login
│   ├── register/page.tsx     # Halaman register
│   ├── dashboard/page.tsx    # Dashboard (protected)
│   ├── cek-gejala/page.tsx   # Form cek gejala (protected)
│   ├── hasil/page.tsx        # Hasil analisis (protected)
│   └── riwayat/page.tsx      # Riwayat pemeriksaan (protected)
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── ProtectedRoute.tsx    # Auth guard wrapper
│   ├── RiskBadge.tsx         # Badge risiko berwarna
│   └── EmptyState.tsx        # Empty state UI
├── contexts/
│   └── AuthContext.tsx       # Firebase Auth context
├── lib/
│   ├── firebase.ts           # Firebase config
│   ├── riskRules.ts          # Rule-based ISPA logic
│   └── firestore.ts          # Firestore helpers
└── types/
    └── index.ts              # TypeScript types
```

## Rule-Based Logic

| Kondisi | Hasil | Rekomendasi |
|---|---|---|
| Lama gejala > 7 hari | 🚨 BAHAYA | Segera ke Faskes/IGD |
| Lama gejala 3–7 hari ATAU ada "Sesak napas" | ⚠️ WASPADA | Konsultasi di Puskesmas/Faskes Terdekat |
| Lainnya | ✅ AMAN | Perawatan di rumah |

## Lisensi

Dibuat untuk keperluan edukasi dan tugas akademik.
