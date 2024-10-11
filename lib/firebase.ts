// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQWBP2RuM4jLk74Gi4KbCLvl5-4U9Mh9w",
  authDomain: "zagooenglish.firebaseapp.com",
  projectId: "zagooenglish",
  storageBucket: "zagooenglish.appspot.com",
  messagingSenderId: "1062955182784",
  appId: "1:1062955182784:web:8a6c760acc3f5bb68f5b25",
  measurementId: "G-JMJ0PJQ15P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
