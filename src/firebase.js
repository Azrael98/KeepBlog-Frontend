// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkniicisRXiYWzgKe4zQjCWORF6JoVngQ",
  authDomain: "blog-image-44f6a.firebaseapp.com",
  projectId: "blog-image-44f6a",
  storageBucket: "blog-image-44f6a.appspot.com",
  messagingSenderId: "102738806603",
  appId: "1:102738806603:web:a2a3a4b9cb3e1f27454ace",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
