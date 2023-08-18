import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

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

export{
    app,
    auth,
    db,
    storage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

}