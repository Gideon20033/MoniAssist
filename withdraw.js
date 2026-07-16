import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const withdrawBtn = document.getElementById("withdrawBtn");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            const bankName = document.getElementById("bankName");
            const accountName = document.getElementById("accountName");
            const accountNumber = document.getElementById("accountNumber");

            if (data.BankName) {
                bankName.value = data.BankName;
                bankName.readOnly = true;
            }

            if (data.AccountName) {
                accountName.value = data.AccountName;
                accountName.readOnly = true;
            }

            if (data.AccountNumber) {
                accountNumber.value = data.AccountNumber;
                accountNumber.readOnly = true;
            }
        }
    } catch (error) {
        console.error(error);
    }
});

withdrawBtn.addEventListener("click", async () => {

    const amount = document.getElementById("amount").value.trim();
    const bankName = document.getElementById("bankName").value.trim();
    const accountName = document.getElementById("accountName").value.trim();
    const accountNumber = document.getElementById("accountNumber").value.trim();

    if (!amount) {
        alert("Please enter withdrawal amount.");
        return;
    }

    if (!bankName || !accountName || !accountNumber) {
        alert("Please enter your bank details.");
        return;
    }

    try {

        // Save bank details to user profile
        await updateDoc(doc(db, "users", currentUser.uid), {
            BankName: bankName,
            AccountName: accountName,
            AccountNumber: accountNumber
        });

        // Create withdrawal request
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

        document.getElementById("bankName").readOnly = true;
        document.getElementById("accountName").readOnly = true;
        document.getElementById("accountNumber").readOnly = true;

    } catch (error) {
        alert(error.message);
    }

});
