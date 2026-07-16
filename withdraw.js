import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const withdrawBtn = document.getElementById("withdrawBtn");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;

        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();

                document.getElementById("bankName").value = data.BankName || "";
                document.getElementById("accountName").value = data.AccountName || "";
                document.getElementById("accountNumber").value = data.AccountNumber || "";

                document.getElementById("bankName").readOnly = true;
                document.getElementById("accountName").readOnly = true;
                document.getElementById("accountNumber").readOnly = true;
            }
        } catch (error) {
            console.error(error);
        }

    } else {
        alert("Please login first.");
        window.location.href = "login.html";
    }
});

withdrawBtn.addEventListener("click", async () => {

    const amount = document.getElementById("amount").value;
    const bankName = document.getElementById("bankName").value;
    const accountName = document.getElementById("accountName").value;
    const accountNumber = document.getElementById("accountNumber").value;

    if (!amount) {
        alert("Please enter withdrawal amount.");
        return;
    }

    try {
        await addDoc(collection(db, "withdrawals"), {
            "Account name": accountName,
            AccountNumber: accountNumber,
            Amount: Number(amount),
            BankName: bankName,
            Email: currentUser.email,
            Status: "Pending",
            UserID: currentUser.uid,
            createdAt: serverTimestamp()
        });

        alert("Withdrawal request submitted successfully!");

        document.getElementById("amount").value = "";

    } catch (error) {
        alert(error.message);
    }
});
