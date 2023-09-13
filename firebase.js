// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPe4QjUbc0OaTb-0SaI_uSr2GGl19B6jo",
  authDomain: "ashansen88mobilenotebook.firebaseapp.com",
  projectId: "ashansen88mobilenotebook",
  storageBucket: "ashansen88mobilenotebook.appspot.com",
  messagingSenderId: "956181951358",
  appId: "1:956181951358:web:8af7e601b8839ff06b792f",
  measurementId: "G-Y4RMD8V1HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app)
export {app, database}