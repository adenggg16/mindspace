import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"; // Tambahkan ini

const firebaseConfig = {
  apiKey: "AIzaSyBCM8JTviNPcpPrgI8ZkzqV_-FeFbQ8SvM",
  authDomain: "mindspace-67ace.firebaseapp.com",
  projectId: "mindspace-67ace",
  storageBucket: "mindspace-67ace.appspot.com",
  messagingSenderId: "879976609680",
  appId: "1:879976609680:web:44a777e263a51cbe99e515",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app); // Export db
