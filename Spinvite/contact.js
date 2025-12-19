import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-status");

const API_KEY = "dfad345d-abf1-4332-b311-5d7afe9bf6d7";

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Sõnumi saatmine...";

    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const company = formData.get("company") || "";
    const message = formData.get("message") || "";

    try {
      // Save message to Firestore
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        phone,
        company,
        message,
        createdAt: serverTimestamp(),
      });

      // Send email through Web3Forms public API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: API_KEY,
          name,
          email,
          phone,
          company,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        statusEl.textContent = "Sõnum saadetud! Võtame teiega peagi ühendust.";
        statusEl.style.color = "green";
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      statusEl.textContent = "Saatmine ebaõnnestus. Palun proovige hiljem uuesti.";
      statusEl.style.color = "red";
      console.error(error);
    }
  });
}