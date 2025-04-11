// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBne6gPU5PGXT_rD4R87ihnZvEegCgY6l8",
  authDomain: "cartify-e4484.firebaseapp.com",
  projectId: "cartify-e4484",
  storageBucket: "cartify-e4484.firebasestorage.app",
  messagingSenderId: "936768838626",
  appId: "1:936768838626:web:35193ca53012a9de70b7bb",
  measurementId: "G-PX6K8WCTBZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };
