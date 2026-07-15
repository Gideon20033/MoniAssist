import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.querySelector("form");

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const amount = document.querySelector('input[type="number"]').value.trim();
        const reference = document.querySelector('input[type="text"]').value.trim();

        if (!amount || !reference) {
            alert("Please fill all details.");
            return;
        }

        if (Number(amount) <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
        }

        try {

            await addDoc(collection(db, "deposits"), {

                userId: user.uid,
                email: user.email,
                amount: Number(amount),
                reference: reference,
                status: "pending",
                createdAt: serverTimestamp()

            });

            alert("Deposit request submitted successfully. Your account will be credited after admin approval.");

            form.reset();

            window.location.href = "dashboard.html";

        } catch (error) {

            alert(error.message);

        }

    });

});
