import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDBpjt2nzBQyjG66ot-wsbVS4h7p0Y2Dho",
  authDomain: "totemic-splicer-285511.firebaseapp.com",
  projectId: "totemic-splicer-285511",
  storageBucket: "totemic-splicer-285511.appspot.com",
  messagingSenderId: "758811971517",
  appId: "1:758811971517:web:52a35aecb4bde16ef68cd4",
  measurementId: "G-Z0WDS08LFF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
