import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_EMAIL = "jeremiahgideon78@gmail.com";

// Protect Admin Dashboard
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.replace("ma-control-7842.html");
        return;
    }

    if (user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {

        alert("Access Denied!");

        await signOut(auth);

        location.replace("login.html");
        return;
    }

    loadDashboard();

});

// Dashboard Statistics
async function loadDashboard() {

    try {

        // USERS
        const usersSnapshot = await getDocs(collection(db, "users"));
        document.getElementById("totalUsers").textContent =
            usersSnapshot.size;

        // DEPOSITS
        const depositsSnapshot = await getDocs(collection(db, "deposits"));

        let totalDeposits = 0;

        depositsSnapshot.forEach(doc => {

            const data = doc.data();

            if (
                data.status &&
                data.status.toLowerCase() === "approved"
            ) {
                totalDeposits += Number(data.amount || 0);
            }

        });

        document.getElementById("totalDeposits").textContent =
            "₦" + totalDeposits.toLocaleString();

        // WITHDRAWALS
        const withdrawalsSnapshot =
            await getDocs(collection(db, "withdrawals"));

        let pendingWithdrawals = 0;

        withdrawalsSnapshot.forEach(doc => {

            const data = doc.data();

            if (
                data.status &&
                data.status.toLowerCase() === "pending"
            ) {
                pendingWithdrawals++;
            }

        });

        document.getElementById("pendingWithdrawals").textContent =
            pendingWithdrawals;

        // INVESTMENTS
        const investmentsSnapshot =
            await getDocs(collection(db, "investments"));

        let activeInvestments = 0;

        investmentsSnapshot.forEach(doc => {

            const data = doc.data();

            if (
                data.status &&
                data.status.toLowerCase() === "active"
            ) {
                activeInvestments++;
            }

        });

        document.getElementById("activeInvestments").textContent =
            activeInvestments;

    } catch (error) {

        console.error(error);

        alert("Unable to load dashboard.");

    }

}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        await signOut(auth);

        location.replace("index.html");

    });

}
