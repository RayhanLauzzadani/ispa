// ============================================================
// Firestore Helper Functions
// ============================================================
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { AnalysisResult, HistoryRecord, UserProfile } from "@/types";

/**
 * Save or update a user profile document at `users/{userId}`.
 * Called once during registration.
 */
export async function saveUserProfile(
  userId: string,
  name: string,
  email: string
): Promise<void> {
  await setDoc(doc(db, "users", userId), {
    name,
    email,
    createdAt: serverTimestamp(),
  } satisfies Omit<UserProfile, "createdAt"> & { createdAt: ReturnType<typeof serverTimestamp> });
}

/**
 * Save a symptom-check result to the user's history sub-collection.
 * Path: `users/{userId}/histories/{auto-id}`
 */
export async function saveHistory(
  userId: string,
  data: AnalysisResult
): Promise<string> {
  const ref = await addDoc(
    collection(db, "users", userId, "histories"),
    {
      symptoms: data.symptoms,
      durationDays: data.durationDays,
      riskLevel: data.riskLevel,
      recommendation: data.recommendation,
      createdAt: serverTimestamp(),
    }
  );
  return ref.id;
}

/**
 * Fetch all history records for a user, sorted newest-first.
 */
export async function getHistories(userId: string): Promise<HistoryRecord[]> {
  const q = query(
    collection(db, "users", userId, "histories"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      symptoms: data.symptoms,
      durationDays: data.durationDays,
      riskLevel: data.riskLevel,
      recommendation: data.recommendation,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(),
    } as HistoryRecord;
  });
}
