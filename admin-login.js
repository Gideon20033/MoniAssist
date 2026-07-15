import { auth } from "./firebase.js";


import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");

const message = document.getElementById("message");



loginBtn.addEventListener("click", async()=>{


const email = emailInput.value.trim();

const password = passwordInput.value.trim();



if(email === "" || password === ""){

message.innerHTML = "Enter email and password";

return;

}



try{


await signInWithEmailAndPassword(

auth,

email,

password

);



message.innerHTML = "Login successful";



setTimeout(()=>{

window.location.href = "admin-dashboard.html";

},1000);



}

catch(error){


console.log(error);


message.innerHTML = error.message;


}



});
