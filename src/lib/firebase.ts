// ============================================================
// Firebase Configuration & Initialization
// ============================================================
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize Firebase when a valid API key is present.
// During `next build` (SSR prerendering) env vars may be empty,
// so we defer initialisation to avoid auth/invalid-api-key errors.
function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfig.apiKey) return null;
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}

const app = getFirebaseApp();

// Auth and Firestore are lazily resolved.
// They will only be used on the client where env vars are available.
export const auth: Auth = app ? getAuth(app) : (null as unknown as Auth);
export const db: Firestore = app
  ? getFirestore(app)
  : (null as unknown as Firestore);
export default app;
