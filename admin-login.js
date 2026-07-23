import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_EMAIL = "jeremiahgideon78@gmail.com";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        message.innerHTML = "Enter email and password";
        return;
    }

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (userCredential.user.email !== ADMIN_EMAIL) {
            await signOut(auth);
            message.innerHTML = "Access denied!";
            return;
        }

        message.style.color = "green";
        message.innerHTML = "Login successful";

        setTimeout(() => {
            window.location.href = "admin-dashboard.html";
        }, 1000);

    } catch (error) {
        message.style.color = "red";
        message.innerHTML = "Invalid email or password";
    }

});
