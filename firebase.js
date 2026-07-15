import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            const userName = document.getElementById("userName");
            const balance = document.getElementById("balance");
            const accountNumber = document.getElementById("accountNumber");

            if (userName) {
                userName.textContent = data.Name || "User";
            }

            if (balance) {
                balance.textContent = "₦" + (data.Balance ?? 0);
            }

            if (accountNumber) {
                accountNumber.textContent = data.Accountnumber || "N/A";
            }
        } else {
            console.log("User document not found.");
        }
    } catch (error) {
        console.error("Error loading user data:", error);
    }
});
