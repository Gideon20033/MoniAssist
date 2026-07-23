import { protectAdminPage } from "./admin-auth.js";

protectAdminPage();

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    getDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const depositList = document.getElementById("depositList");

async function loadDeposits() {

    depositList.innerHTML = "Loading...";

    const snapshot = await getDocs(collection(db, "deposits"));

    depositList.innerHTML = "";

    if (snapshot.empty) {
        depositList.innerHTML = `
        <div class="empty">
            No deposit requests
        </div>
        `;
        return;
    }

    snapshot.forEach((item) => {

        const data = item.data();

        if (data.status === "Pending") {

            depositList.innerHTML += `
                <div class="deposit-card">

                    <p><b>Email:</b> ${data.email}</p>

                    <p><b>Amount:</b> ₦${data.amount}</p>

                    <p><b>Reference:</b> ${data.reference}</p>

                    <p><b>Status:</b> ${data.status}</p>

                    <button onclick="approveDeposit('${item.id}','${data.userId}',${data.amount})">
                        Approve
                    </button>

                    <button onclick="rejectDeposit('${item.id}')">
                        Reject
                    </button>

                </div>
            `;
        }

    });

}

window.approveDeposit = async function(id, userId, amount) {

    await updateDoc(doc(db, "deposits", id), {
        status: "Approved"
    });

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

        const userData = userSnap.data();
        const balance = Number(userData.Balance || 0);

        await updateDoc(userRef, {
            Balance: balance + Number(amount),
            HasDeposited: true,
            HasActiveInvestment: true
        });

        await addDoc(collection(db, "transactions"), {
            userId: userId,
            email: userData.Email || "",
            amount: Number(amount),
            type: "Deposit",
            status: "Approved",
            createdAt: new Date()
        });

    }

    alert("Deposit approved successfully");

    loadDeposits();

};

window.rejectDeposit = async function(id) {

    await updateDoc(doc(db, "deposits", id), {
        status: "Rejected"
    });

    alert("Deposit rejected");

    loadDeposits();

};

loadDeposits();
