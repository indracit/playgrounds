// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging } from "firebase/messaging";
import {initapp} from '../assets/config.json'
// Your web app's Firebase configuration
console.log('initapp',initapp)
const firebaseConfig = initapp

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);