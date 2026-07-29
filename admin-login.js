import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_EMAIL = "jeremiahgideon78@gmail.com";

window.addEventListener("DOMContentLoaded", () => {

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
    const message = document.getElementById("message");

    if (!emailInput || !passwordInput || !loginBtn || !message) {
        console.error("Admin login HTML elements not found.");
        return;
    }

    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        message.style.color = "red";
        message.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            message.textContent = "Please enter your email and password.";
            return;
        }

        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in...";

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user.email !== ADMIN_EMAIL) {
                await signOut(auth);
                message.textContent = "Access denied!";
                loginBtn.disabled = false;
                loginBtn.textContent = "Login";
                return;
            }

            message.style.color = "green";
            message.textContent = "Login successful!";

            setTimeout(() => {
                window.location.href = "admin-dashboard.html";
            }, 1000);

        } catch (error) {
            console.error(error);

            message.style.color = "red";

            switch (error.code) {
                case "auth/invalid-email":
                    message.textContent = "Invalid email address.";
                    break;

                case "auth/user-not-found":
                case "auth/invalid-credential":
                case "auth/wrong-password":
                    message.textContent = "Invalid email or password.";
                    break;

                case "auth/too-many-requests":
                    message.textContent = "Too many attempts. Try again later.";
                    break;

                default:
                    message.textContent = error.message;
            }

            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        }
    });

});
