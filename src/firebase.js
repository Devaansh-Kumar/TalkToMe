// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD6ewFOgAbwFk1wb0fJxiF8lD5etlUrvo4",
    authDomain: "talktome-e4031.firebaseapp.com",
    projectId: "talktome-e4031",
    storageBucket: "talktome-e4031.appspot.com",
    messagingSenderId: "321649043713",
    appId: "1:321649043713:web:a124be3a0ac68542799300",
    measurementId: "G-HKK4VYHN83"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);