import { initializeApp } from "firebase/app";
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
  measurementId: "G-2K01Z4JEXE",
  databaseURL: "https://circli-1fc9c-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Ottieni l'istanza del Realtime Database
const GoogleProvider = new GoogleAuthProvider();
// Export needed firebase functions
export { app, db, ref, set, getAuth, GoogleAuthProvider,GoogleProvider, signInWithPopup, signInWithEmailAndPassword };
