// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBarG42C3KECca_OP7HIJFg1AuZlWOjkt8",
  authDomain: "vite-firebase-9adcb.firebaseapp.com",
  projectId: "vite-firebase-9adcb",
  storageBucket: "vite-firebase-9adcb.appspot.com",
  messagingSenderId: "328406743255",
  appId: "1:328406743255:web:5d42d33d4b937ca9cc9892",
  measurementId: "G-DS6PM867N9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
