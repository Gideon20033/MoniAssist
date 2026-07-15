import { auth, db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const withdrawBtn = document.getElementById("withdrawBtn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
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

    if (!amount || !bankName || !accountName || !accountNumber) {
        alert("Please fill in all fields.");
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
        document.getElementById("bankName").value = "";
        document.getElementById("accountName").value = "";
        document.getElementById("accountNumber").value = "";

    } catch (error) {
        alert(error.message);
    }
});
