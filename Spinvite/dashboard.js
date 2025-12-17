import { logout } from "./auth.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const logoutBtn = document.querySelector(".app-user-menu-item.is-danger");
const userNameEl = document.getElementById("user-name");
const userAvatarEl = document.getElementById("user-avatar"); // make sure this id exists in HTML

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error signing out:", error);
      // optional: show a message somewhere if you have a message element
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const displayName = user.displayName || "";
  const email = user.email || "";

  const nameToShow = displayName || email;
  if (userNameEl) userNameEl.textContent = nameToShow;

  const firstLetter = (displayName.trim().charAt(0) || email.trim().charAt(0) || "U").toUpperCase();
  if (userAvatarEl) userAvatarEl.textContent = firstLetter;
});