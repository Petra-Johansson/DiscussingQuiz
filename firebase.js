// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW1oBHGc7QkDnrN7akorou9skm2H9gyyg",
  authDomain: "quizforum-app.firebaseapp.com",
  projectId: "quizforum-app",
  storageBucket: "quizforum-app.appspot.com",
  messagingSenderId: "261810954553",
  appId: "1:261810954553:web:e94a157752c41e8ad108e8",
  measurementId: "G-Y4RXSQCLDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);