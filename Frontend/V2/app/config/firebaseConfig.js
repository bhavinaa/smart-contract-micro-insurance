import { initializeApp } from "firebase/app";
import { getAuth,  sendPasswordResetEmail  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAIqCOfYLsHTI5b-eZyzTyHjFHNquKapEU",
  authDomain: "aintern-415bb.firebaseapp.com",
  projectId: "aintern-415bb",
  storageBucket: "aintern-415bb.firebasestorage.app",
  messagingSenderId: "1047494600812",
  appId: "1:1047494600812:web:13e3b78fbec75268ff1049"
};

// // firebase.initializeApp(firebaseConfig);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const authentication = getAuth(app);
// const db = getFirestore(app); 

// // export { authentication, firebaseConfig};
// export { authentication, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getStorage,  sendPasswordResetEmail  };


// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Authentication
export const authentication = getAuth(app);

// ✅ Default export required by Expo Router
export default app;