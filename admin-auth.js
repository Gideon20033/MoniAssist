import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_EMAIL = "jeremiahgideon78@gmail.com";

export function protectAdminPage() {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            window.location.href = "admin-login.html";
            return;
        }

        if (user.email !== ADMIN_EMAIL) {

            alert("Access Denied");

            await signOut(auth);

            window.location.href = "login.html";
            return;
        }

    });

}
