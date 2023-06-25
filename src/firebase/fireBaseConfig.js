import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTpz6YK_VxxBKZV3gpMUJdmJDHWNZU6XI",
  authDomain: "chatapplication-18013.firebaseapp.com",
  projectId: "chatapplication-18013",
  storageBucket: "chatapplication-18013.appspot.com",
  messagingSenderId: "601351827912",
  appId: "1:601351827912:web:73400a5876f0c2564390fd",
  measurementId: "G-KCX94JHVBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
