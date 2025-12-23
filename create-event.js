import { auth } from "./firebase.js";
import { createEvent } from "./events-db.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const form = document.getElementById("event-step1-form");


// Make sure user is logged in
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in → send to login page
    window.location.href = "login.html";
    return;
  }
  currentUser = user;
});

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Palun logi sisse, et luua sündmus.");
      return;
    }

    const eventName = document.getElementById("eventName").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;
    const eventType = document.getElementById("eventType").value;
    const timezone = document.getElementById("timezone").value;
    const location = document.getElementById("location").value;
    const rsvpDeadline = document.getElementById("rsvpDeadline").value;

    const isOnline = form.elements["isOnline"].checked;
    const openRegistration = form.elements["openRegistration"].checked;

    const totalParticipants = Number(document.getElementById("totalParticipants").value || 0);
    const attendingCount = Number(document.getElementById("attendingCount").value || 0);
    const notAttendingCount = Number(document.getElementById("notAttendingCount").value || 0);
    const noAnswerCount = Number(document.getElementById("noAnswerCount").value || 0);

    if (!eventName || !startDate) {
        alert("Palun täida kõik kohustuslikud väljad.");
        return;
    }

    const eventData = {
        name: eventName,
        type: eventType || null,
        date: startDate,
        time: startTime || "",
        endDate: endDate || "",
        endTime: endTime || "",
        timezone: timezone || "",
        location,
        rsvpDeadline: rsvpDeadline || "",
        isOnline,
        openRegistration,

        stats: {
            total: totalParticipants,
            attending: attendingCount,
            notAttending: notAttendingCount,
            noAnswer: noAnswerCount
        },

        status: "Avaldatud",
    };

    try {
        await createEvent(currentUser.uid, eventData);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error creating event:", error);
        alert("Sündmuse loomine ebaõnnestus: " + error.message);
    }
    });
}