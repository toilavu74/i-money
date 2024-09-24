import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD0j7mn1zzwrd4REiPtYK8KcO1XwEoVPmw",
  authDomain: "imoney-3b7c4.firebaseapp.com",
  projectId: "imoney-3b7c4",
  storageBucket: "imoney-3b7c4.appspot.com",
  messagingSenderId: "1088257212366",
  appId: "1:1088257212366:web:b14389ba40598c7546759f",
  measurementId: "G-HT5GBYSR3P",
};
const app = initializeApp(firebaseConfig);
const projectAuth = getAuth(app);
const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);
const timestamp = serverTimestamp();

export { projectAuth, projectFirestore, projectStorage, timestamp };
