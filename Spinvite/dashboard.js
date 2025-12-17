import { logout } from "./auth.js";

const logoutBtn = document.querySelector(".app-user-menu-item.is-danger");
const messageSection = document.getElementById("message");

logoutBtn.addEventListener("click", async () => {
  try {
      await logout();
      setTimeout(() => {
          window.location.href = "index.html";
      }, 1000);
    }
      catch (error) 
      {
          messageSection.textContent = "Error signing out: " + error.message;
          messageSection.style.color = "red";
          console.error("Error signing out:", error);
      }
  })