// firebase.js

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// Firebase Configuration

const firebaseConfig = {

apiKey: "AIzaSyDdNbon5tkIxs1GF2hA036NtGyQVfT2TOE",

authDomain: "moniassist-102d4.firebaseapp.com",

projectId: "moniassist-102d4",

storageBucket: "moniassist-102d4.firebasestorage.app",

messagingSenderId: "247401495099",

appId: "1:247401495099:web:1f889506c4780d2a56fa1e",

measurementId: "G-C5R75XZ12T"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);



// Authentication

const auth = getAuth(app);



// Firestore Database

const db = getFirestore(app);



// Export for other files

export { auth, db };
