import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'; // Add signInWithEmailAndPassword import


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZdLxFKXsJ_FNtFlKMr04lcd-1td5ZfUo",
  authDomain: "circli-1fc9c.firebaseapp.com",
  projectId: "circli-1fc9c",
  storageBucket: "circli-1fc9c.firebasestorage.app",
  messagingSenderId: "1089022841990",
  appId: "1:1089022841990:web:9a59d305201b1ab6102d07",
  measurementId: "G-2K01Z4JEXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app); // Ottieni l'istanza del Realtime Database

// Export needed firebase functions
export { app, analytics, db, ref, set, getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword };
