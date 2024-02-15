// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtpy2wZkzl-9n_t_msjjgy7wS-dsScfDA",
    authDomain: "blinkit-accounts.firebaseapp.com",
    projectId: "blinkit-accounts",
    storageBucket: "blinkit-accounts.appspot.com",
    messagingSenderId: "803057729667",
    appId: "1:803057729667:web:3b74f4ca40dd3757425bb6",
    measurementId: "G-QWTQQR7GBR"
  };
  
  // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };