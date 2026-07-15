import { auth, db } from "./firebase.js";

import { 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {

    if(user){

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);


        if(userSnap.exists()){

            const data = userSnap.data();


            document.querySelector(".profile-top h2").textContent =
            data.Name || "User";


            document.querySelectorAll(".text p")[0].textContent =
            data.Name || "User";


            document.querySelectorAll(".text p")[1].textContent =
            data.Phone || "No phone";


            document.querySelectorAll(".text p")[2].textContent =
            data.Email || user.email;


            document.querySelectorAll(".text p")[3].textContent =
            "₦" + (data.Balance || 0);


            document.querySelectorAll(".text p")[4].textContent =
            data.Accountnumber || "Generate Later";


        }else{

            console.log("User data not found");

        }


    }else{

        window.location.href = "login.html";

    }

});
