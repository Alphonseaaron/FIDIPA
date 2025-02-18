import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZr0_qHaBuqwJ_N5oJ5UQgcMMC5BILb3U",
  authDomain: "f-i-d-i-p-a.firebaseapp.com",
  databaseURL: "https://f-i-d-i-p-a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "f-i-d-i-p-a",
  storageBucket: "f-i-d-i-p-a.firebasestorage.app",
  messagingSenderId: "432992747142",
  appId: "1:432992747142:web:ab224b5f7280e6b50f9b07",
  measurementId: "G-JS3ZN8YTEG"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Collection names as constants
export const COLLECTIONS = {
  SECTIONS: 'sections',
  BLOG_POSTS: 'blog_posts',
  PROGRAMS: 'programs',
  PROJECTS: 'projects',
  SITE_CONFIG: 'site_config',
  TEAM: 'team'
} as const;

// Default sections visibility
export const defaultSections = {
  home: true,
  about: true,
  programs: true,
  projects: true,
  team: true,
  blog: true,
  contact: true
};

export default app;