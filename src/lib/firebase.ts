// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3o7ZX2xx2zNHtmIINKuf3dZ62g9WGY68",
  authDomain: "maryam-taoheed.firebaseapp.com",
  projectId: "maryam-taoheed",
  storageBucket: "maryam-taoheed.firebasestorage.app",
  messagingSenderId: "365337943819",
  appId: "1:365337943819:web:1338d8066130b2de7a4c0e",
  measurementId: "G-X0SMK6QS8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);