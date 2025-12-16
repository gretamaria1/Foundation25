import { signup } from "./auth.js";

const form = document.getElementById("signup-form");

const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const terms = document.querySelector('input[name="terms"]');
const messageSection = document.getElementById("message");

const showMessage = (message, isError = false) => {
    messageSection.textContent = message;
    messageSection.style.color = isError ? "red" : "green";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

  console.log("Eesnimi:", firstNameInput.value);
  console.log("Perekonnanimi:", lastNameInput.value);
  console.log("Email:", emailInput.value);
  console.log("Parool:", passwordInput.value);
  console.log("Nõustun tingimustega:", terms.checked);
  try {
    const user = await signup (email, password);
    showMessage("Successfully signed up" + user.email);
  }
    catch (error) {
        //console.log("Signup error: ", error);
        showMessage(`Signup error: ${error.message}`, true);
    }
});