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

    // Get reward from user's VIP plan
    const reward = userData.dailyIncome || 0;

    if (reward <= 0) {
        alert("You don't have an active VIP plan.");
        return;
    }

    // Check if already claimed within 24 hours
    const dailyRef = doc(db, "dailyTasks", currentUser.uid);
    const dailySnap = await getDoc(dailyRef);

    if (dailySnap.exists()) {
        const lastClaim = dailySnap.data().claimedAt?.toDate();

        if (lastClaim) {
            const hours = (new Date() - lastClaim) / (1000 * 60 * 60);

            if (hours < 24) {
                alert("You have already claimed today's reward.");
                return;
            }
        }
    }

    // Add reward to balance
    await updateDoc(userRef, {
        Balance: (userData.Balance || 0) + reward
    });

    // Save claim time
    await setDoc(dailyRef, {
        claimedAt: new Date(),
        reward: reward
    });

    // Save transaction
    await addDoc(collection(db, "transactions"), {
        userId: currentUser.uid,
        email: userData.Email || "",
        amount: reward,
        type: "Daily Task Reward",
        status: "Completed",
        createdAt: new Date()
    });

    claimBtn.disabled = true;
    claimBtn.textContent = "Reward Claimed";

    alert(`Congratulations!\n\n₦${reward.toLocaleString()} has been added to your balance.`);
});
