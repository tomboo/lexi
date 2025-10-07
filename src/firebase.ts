
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApQ9gHA9jzJL2tUNLfnFsUwP0qH6Klu-o",
  authDomain: "lexi-chat.firebaseapp.com",
  projectId: "lexi-chat",
  storageBucket: "lexi-chat.firebasestorage.app",
  messagingSenderId: "549377749239",
  appId: "1:549377749239:web:6fd2663de727e813eaa3f2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
