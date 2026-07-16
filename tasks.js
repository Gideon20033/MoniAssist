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
    collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const taskButtons = document.querySelectorAll(".taskBtn");
const claimBtn = document.getElementById("claimBtn");

let completedTasks = 0;
let currentUser = null;

function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    currentUser = user;

    const dailyRef = doc(db, "dailyTasks", user.uid);
    const dailySnap = await getDoc(dailyRef);

    if (dailySnap.exists()) {

        const data = dailySnap.data();

        if (data.date === todayKey()) {

    taskButtons.forEach(btn => {
        btn.disabled = true;
        btn.textContent = "Completed";
    });

    claimBtn.disabled = true;
    claimBtn.textContent = "Reward Claimed Today";

    alert("You have already completed today's tasks. Come back after 12:00 AM.");

} else {

    completedTasks = 0;

    taskButtons.forEach(btn => {
        btn.disabled = false;
        btn.textContent = "Done";
    });

    claimBtn.disabled = true;
    claimBtn.textContent = "Claim ₦100";

        }

    }

});

taskButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        if (btn.disabled) return;

        btn.disabled = true;
        btn.textContent = "Completed";

        completedTasks++;

        if (completedTasks === 5) {
            claimBtn.disabled = false;
        }

    });

});

claimBtn.addEventListener("click", async () => {

    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        alert("User account not found.");
        return;
    }

    const userData = userSnap.data();
    const reward = 100;

    await updateDoc(userRef, {
        Balance: (userData.Balance || 0) + reward
    });

    await setDoc(doc(db, "dailyTasks", currentUser.uid), {
        date: todayKey(),
        reward: reward,
        completed: true,
        claimedAt: new Date()
    });

    await addDoc(collection(db, "transactions"), {
        userId: currentUser.uid,
        email: userData.Email || "",
        amount: reward,
        type: "Daily Task Reward",
        status: "Completed",
        createdAt: new Date()
    });

    claimBtn.disabled = true;
    claimBtn.textContent = "Reward Claimed Today";

    alert("Congratulations! ₦100 has been added to your MoniAssist balance.");

});
