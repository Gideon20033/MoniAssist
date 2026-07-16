import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    addDoc,
    collection,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const vipContainer = document.getElementById("vipContainer");

let currentUser = null;


const vipPlans = [

{
    vip: "VIP 1",
    investment: 3000,
    dailyIncome: 750,
    totalIncome: 67500,
    duration: 90
},

{
    vip: "VIP 2",
    investment: 7000,
    dailyIncome: 1750,
    totalIncome: 157500,
    duration: 90
},

{
    vip: "VIP 3",
    investment: 15000,
    dailyIncome: 3750,
    totalIncome: 337500,
    duration: 90
},

{
    vip: "VIP 4",
    investment: 30000,
    dailyIncome: 7500,
    totalIncome: 675000,
    duration: 90
},

{
    vip: "VIP 5",
    investment: 50000,
    dailyIncome: 12500,
    totalIncome: 1125000,
    duration: 90
},

{
    vip: "VIP 6",
    investment: 70000,
    dailyIncome: 17500,
    totalIncome: 1575000,
    duration: 90
},

{
    vip: "VIP 7",
    investment: 50000,
    dailyIncome: 15000,
    totalIncome: 1350000,
    duration: 90
},

{
    vip: "VIP 8",
    investment: 70000,
    dailyIncome: 20000,
    totalIncome: 1800000,
    duration: 90
},

{
    vip: "VIP 9",
    investment: 100000,
    dailyIncome: 30000,
    totalIncome: 2700000,
    duration: 90
}

];


onAuthStateChanged(auth, (user)=>{

    if(!user){

        window.location.href="login.html";
        return;

    }

    currentUser = user;

    loadVIP();

});


function loadVIP(){

    vipContainer.innerHTML = "";


    vipPlans.forEach((plan,index)=>{


        const card = document.createElement("div");

        card.className = "vip-card";


        card.innerHTML = `

        <h3>${plan.vip}</h3>

        <p>💰 Investment: ₦${plan.investment.toLocaleString()}</p>

        <p>📅 Daily Income: ₦${plan.dailyIncome.toLocaleString()}</p>

        <p>📈 Total Income: ₦${plan.totalIncome.toLocaleString()}</p>

        <p>⏳ Duration: ${plan.duration} Days</p>


        <button class="buy-btn" id="vip${index}">
        Invest Now
        </button>

        `;


        vipContainer.appendChild(card);


        document
        .getElementById(`vip${index}`)
        .addEventListener("click",()=>{

            buyVIP(plan);

        });


    });


}

async function buyVIP(plan){

    if(!currentUser){
        alert("Please login first.");
        return;
    }


    const userRef = doc(db,"users",currentUser.uid);

    const userSnap = await getDoc(userRef);


    if(!userSnap.exists()){

        alert("User account not found.");
        return;

    }


    const userData = userSnap.data();


    const balance = Number(userData.Balance || 0);



    if(balance < plan.investment){

        alert(
            "Insufficient balance.\nPlease deposit first."
        );

        return;

    }



    // Check existing VIP

    const vipRef = doc(db,"vip",currentUser.uid);

    const vipSnap = await getDoc(vipRef);



    if(vipSnap.exists()){

        const oldVIP = vipSnap.data();


        if(oldVIP.active === true){

            const confirmUpgrade = confirm(
                "You already have an active VIP.\nDo you want to upgrade?"
            );


            if(!confirmUpgrade){

                return;

            }

        }

    }



    const newBalance = balance - plan.investment;



    await updateDoc(userRef,{

        Balance:newBalance,
        activeVIP:true

    });



    const purchaseDate = new Date();


    const expiryDate = new Date();

    expiryDate.setDate(
        expiryDate.getDate() + plan.duration
    );



    await setDoc(vipRef,{

        userId:currentUser.uid,

        vip:plan.vip,

        investment:plan.investment,

        dailyIncome:plan.dailyIncome,

        totalIncome:plan.totalIncome,

        duration:plan.duration,

        active:true,

        purchaseDate:Timestamp.fromDate(
            purchaseDate
        ),

        expiryDate:Timestamp.fromDate(
            expiryDate
        )


    });


                     
  {
    vip: "VIP 7",
    investment: 50000,
    dailyIncome: 15000,
    totalIncome: 1350000,
    duration: 90
  },
  {
    vip: "VIP 8",
    investment: 70000,
    dailyIncome: 20000,
    totalIncome: 1800000,
    duration: 90
  },
  {
    vip: "VIP 9",
    investment: 100000,
    dailyIncome: 30000,
    totalIncome: 2700000,
    duration: 90
  }
];
