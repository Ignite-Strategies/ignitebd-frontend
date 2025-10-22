// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNsO_LnQ7t3L_KWejjCuUQxxkI3r0iRxM",
  authDomain: "ignite-strategies-313c0.firebaseapp.com",
  projectId: "ignite-strategies-313c0",
  storageBucket: "ignite-strategies-313c0.firebasestorage.app",
  messagingSenderId: "252461468255",
  appId: "1:252461468255:web:0d62b1a63e3e8da77329ea",
  measurementId: "G-J2YCGRF1ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
