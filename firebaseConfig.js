import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc, updateDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage,ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrhHAyR4l-zyAkuOD2xAIvqg3iemcJLx8",
    authDomain: "hackathon-324.firebaseapp.com",
    projectId: "hackathon-324",
    storageBucket: "hackathon-324.appspot.com",
    messagingSenderId: "776271736927",
    appId: "1:776271736927:web:26403a1f52835967a9ebea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    app,
    db,
    storage,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getAuth,
    createUserWithEmailAndPassword,
    query,
    where,
    getDocs,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    ref,
    getDownloadURL,
    updateDoc,
    uploadBytesResumable
};