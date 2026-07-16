import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const totalDeposit = document.getElementById("totalDeposit");
const totalWithdrawal = document.getElementById("totalWithdrawal");
const platformBalance = document.getElementById("platformBalance");
const totalTransactions = document.getElementById("totalTransactions");
const walletTable = document.getElementById("walletTable");

async function loadWallet() {

    let deposits = 0;
    let withdrawals = 0;
    let transactions = 0;

    walletTable.innerHTML = "";

    // Load Deposits
    const depositSnap = await getDocs(collection(db, "deposits"));

    depositSnap.forEach(doc => {

        const data = doc.data();

        if (data.status === "Approved") {

            deposits += Number(data.amount || 0);
            transactions++;

            walletTable.innerHTML += `
            <tr>
                <td>${data.email || "-"}</td>
                <td>Deposit</td>
                <td>₦${Number(data.amount).toLocaleString()}</td>
                <td>${data.status}</td>
            </tr>
            `;
        }

    });

    // Load Withdrawals
    const withdrawalSnap = await getDocs(collection(db, "withdrawals"));

    withdrawalSnap.forEach(doc => {

        const data = doc.data();

        if (data.status === "Approved") {

            withdrawals += Number(data.amount || 0);
            transactions++;

            walletTable.innerHTML += `
            <tr>
                <td>${data.email || "-"}</td>
                <td>Withdrawal</td>
                <td>₦${Number(data.amount).toLocaleString()}</td>
                <td>${data.status}</td>
            </tr>
            `;
        }

    });

    totalDeposit.innerHTML = "₦" + deposits.toLocaleString();
    totalWithdrawal.innerHTML = "₦" + withdrawals.toLocaleString();
    platformBalance.innerHTML = "₦" + (deposits - withdrawals).toLocaleString();
    totalTransactions.innerHTML = transactions;

    if (transactions === 0) {
        walletTable.innerHTML = `
        <tr>
            <td colspan="4">No transactions found</td>
        </tr>
        `;
    }

}

loadWallet();
