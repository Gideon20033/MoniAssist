import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const withdrawalList = document.getElementById("withdrawalList");


async function loadWithdrawals(){

    withdrawalList.innerHTML = "Loading...";


    const q = query(
        collection(db,"withdrawals"),
        where("status","==","pending")
    );


    const snapshot = await getDocs(q);


    withdrawalList.innerHTML = "";


    if(snapshot.empty){
        withdrawalList.innerHTML = "No pending withdrawals";
        return;
    }


    snapshot.forEach((item)=>{

        const data = item.data();


        withdrawalList.innerHTML += `

        <div class="card">

        <h3>${data.name || "User"}</h3>

        <p>Amount: ₦${data.amount}</p>

        <p>Account: ${data.accountNumber}</p>

        <p>Status: ${data.status}</p>


        <button class="approve"
        onclick="approveWithdrawal('${item.id}')">
        Accept
        </button>


        <button class="reject"
        onclick="rejectWithdrawal('${item.id}')">
        Reject
        </button>


        </div>

        `;

    });

}



window.approveWithdrawal = async function(id){

    await updateDoc(
        doc(db,"withdrawals",id),
        {
            status:"approved"
        }
    );


    alert("Withdrawal approved");

    loadWithdrawals();

}




window.rejectWithdrawal = async function(id){

    await updateDoc(
        doc(db,"withdrawals",id),
        {
            status:"rejected"
        }
    );


    alert("Withdrawal rejected");

    loadWithdrawals();

}



loadWithdrawals();
