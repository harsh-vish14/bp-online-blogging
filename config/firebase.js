// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4hB3kk-O8mN8pW-bFTynqYsRDa5k3xig",
  authDomain: "grahql-blog.firebaseapp.com",
  projectId: "grahql-blog",
  storageBucket: "grahql-blog.appspot.com",
  messagingSenderId: "352596485963",
  appId: "1:352596485963:web:55ce83f9e49b0106752ace",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
