import { signup, login } from "./auth.js";

const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("message");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const termsChecked = document.querySelector('input[name="terms"]').checked;

    if (!termsChecked) {
      signupMessage.textContent = "Palun nõustu kasutustingimustega.";
      signupMessage.style.color = "red";
      return;
    }

    try {
      const user = await signup(email, password, firstName, lastName);

      signupMessage.textContent = "Registreerimine õnnestus!";
      signupMessage.style.color = "green";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);

    } catch (error) {
      signupMessage.textContent = error.message;
      signupMessage.style.color = "red";
      console.error("Signup error:", error);
    }
  });
}

const loginForm = document.querySelector(".auth-form");

if (loginForm && document.getElementById("signin-btn")) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const user = await login(email, password);

      window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
      console.error("Login error:", error);
    }
  });
}