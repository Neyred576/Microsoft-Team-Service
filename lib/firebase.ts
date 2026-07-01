import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAu5BbdDM6p5exv9ubCf4uSzQi32fSo6ec",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "team-services-b8a54.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://team-services-b8a54-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "team-services-b8a54",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "team-services-b8a54.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "22636827257",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:22636827257:web:ea223f6c3e339de5b1baa8",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const db = getDatabase(app);
