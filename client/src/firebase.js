// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "soft-biooid.firebaseapp.com",
  projectId: "soft-biooid",
  storageBucket: "soft-biooid.appspot.com",
  messagingSenderId: "934345927605",
  appId: "1:934345927605:web:1a3d88c18c246d7a96c7fc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
