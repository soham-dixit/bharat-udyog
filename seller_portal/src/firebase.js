// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtd2ZWKw-5tqAbO_03GYevoLm4X0ndyQ4",
  authDomain: "dnk-documents.firebaseapp.com",
  databaseURL: "https://dnk-documents-default-rtdb.firebaseio.com",
  projectId: "dnk-documents",
  storageBucket: "dnk-documents.appspot.com",
  messagingSenderId: "269134875606",
  appId: "1:269134875606:web:bb5b53f9ba08b4051bf277",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
