
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs0lN9Jinxfj-_Sf1Wu57DSBTmltosr6I",
  authDomain: "shoponwheel-7028e.firebaseapp.com",
  projectId: "shoponwheel-7028e",
  storageBucket: "shoponwheel-7028e.appspot.com",
  messagingSenderId: "19733146857",
  appId: "1:19733146857:web:c6c2922a42542629f95478",
  measurementId: "G-Z1SC657WQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);