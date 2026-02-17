// ============================================
// FIREBASE CONFIGURATION
// Client-side Firebase SDK initialization
// ============================================

// Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration object
// Contains your project's unique identifiers
const firebaseConfig = {
  apiKey: "AIzaSyAz6OtqS3o55G2oE6ioYbqHSAjuJ22L3rM",
  authDomain: "mens-toolkit.firebaseapp.com",
  projectId: "mens-toolkit",
  storageBucket: "mens-toolkit.firebasestorage.app",
  messagingSenderId: "1057587614766",
  appId: "1:1057587614766:web:c4be29fd8224912db43bbf"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider to always prompt for account selection
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Export for use in other files
export { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  googleProvider,
  signInWithPopup
};
