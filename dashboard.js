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


// Check admin access
onAuthStateChanged(auth, async (user)=>{

    if(!user){
        window.location.href = "admin-login.html";
        return;
    }


    if(user.email !== ADMIN_EMAIL){

        alert("Access Denied");

        await signOut(auth);

        window.location.href = "login.html";

        return;
    }


    loadDashboardStats();

});



// Load dashboard numbers
async function loadDashboardStats(){


    // USERS
    const usersSnapshot = await getDocs(
        collection(db,"users")
    );


    document.getElementById("totalUsers").innerHTML =
    usersSnapshot.size;



    // DEPOSITS

    const depositsSnapshot = await getDocs(
        collection(db,"deposits")
    );


    let totalDeposit = 0;


    depositsSnapshot.forEach((doc)=>{

        const data = doc.data();


        if(data.status === "approved" || data.status === "Approved"){

            totalDeposit += Number(data.amount || 0);

        }

    });


    document.getElementById("totalDeposits").innerHTML =
    "₦" + totalDeposit;



    // WITHDRAWALS

    const withdrawalsSnapshot = await getDocs(
        collection(db,"withdrawals")
    );


    let pending = 0;


    withdrawalsSnapshot.forEach((doc)=>{

        const data = doc.data();


        if(data.status === "Pending"){

            pending++;

        }

    });


    document.getElementById("pendingWithdrawals").innerHTML =
    pending;



    // INVESTMENTS

    const investmentSnapshot = await getDocs(
        collection(db,"investments")
    );


    let active = 0;


    investmentSnapshot.forEach((doc)=>{

        const data = doc.data();


        if(data.status === "Active"){

            active++;

        }

    });


    document.getElementById("activeInvestments").innerHTML =
    active;


}
