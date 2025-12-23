import { logout } from "./auth.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getEventsForUser } from "./events-db.js";

const logoutBtn = document.querySelector(".app-user-menu-item.is-danger");
const userNameEl = document.getElementById("user-name");
const userAvatarEl = document.getElementById("user-avatar");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  });
}

onAuthStateChanged(auth, async (user) => {
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

  await loadUserEvents(user.uid);
});

async function loadUserEvents(uid) {
  const upcomingGrid = document.getElementById("upcoming-events");
  const pastGrid = document.getElementById("past-events");

  if (!upcomingGrid || !pastGrid) {
    console.warn("Event grids not found in DOM");
    return;
  }

  upcomingGrid.innerHTML = "";
  pastGrid.innerHTML = "";

  let events = [];
  try {
    events = await getEventsForUser(uid);
  } catch (error) {
    console.error("Error loading events:", error);
    return;
  }

  events.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  events.forEach((event) => {
    const eventDate = event.date ? new Date(event.date) : null;
    if (!eventDate || isNaN(eventDate)) return;

    eventDate.setHours(0, 0, 0, 0);

    const isUpcoming = eventDate >= today;
    const card = createEventCard(event);

    if (isUpcoming) {
      upcomingGrid.appendChild(card);
    } else {
      pastGrid.appendChild(card);
    }
  });

  setupTabs();
}

function createEventCard(event) {
  const article = document.createElement("article");
  article.className = "event-card";
  
  const header = document.createElement("div");
  header.className = "event-card-header";

  const img = document.createElement("img");
  img.src = "images/christmas.jpg";
  img.alt = event.name;
  img.className = "event-image";

  const statusPill = document.createElement("div");
  statusPill.className = "event-status-pill";
  statusPill.textContent = event.status || "Avaldatud";

  const menuBtn = document.createElement("button");
  menuBtn.className = "event-menu";
  menuBtn.type = "button";
  menuBtn.setAttribute("aria-label", "Rohkem valikuid");
  menuBtn.textContent = "⋮";

  header.appendChild(img);
  header.appendChild(statusPill);
  header.appendChild(menuBtn);

  const body = document.createElement("div");
  body.className = "event-card-body";

  const title = document.createElement("h3");
  title.className = "event-title";
  title.textContent = event.name;

  const date = document.createElement("p");
  date.className = "event-date";
  date.textContent = formatDate(event.date);

  const footer = document.createElement("div");
  footer.className = "event-card-footer";

  const chart = document.createElement("div");
  chart.className = "event-chart";

  const legend = document.createElement("div");
  legend.className = "event-legend";

  const stats = event.stats || {};

  const liAttending = document.createElement("li");
  liAttending.innerHTML = '<span class="dot dot--teal"></span> Osaleb ' + (stats.attending ?? 0);

  const liNotAnswered = document.createElement("li");
  liNotAnswered.innerHTML = '<span class="dot dot--light"></span> Pole vastanud ' + (stats.noAnswer ?? 0);

  const liNotAttending = document.createElement("li");
  liNotAttending.innerHTML = '<span class="dot dot--lighter"></span> Ei osale ' + (stats.notAttending ?? 0);
  
  legend.appendChild(liAttending);
  legend.appendChild(liNotAnswered);
  legend.appendChild(liNotAttending);

  footer.appendChild(chart);
  footer.appendChild(legend);

  body.appendChild(title);
  body.appendChild(date);
  body.appendChild(footer);

  article.appendChild(header);
  article.appendChild(body);

  return article;
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

function setupTabs() {
  const tabButtons = document.querySelectorAll(".dashboard-tab");
  const upcomingGrid = document.getElementById("upcoming-events");
  const pastGrid = document.getElementById("past-events");

  if (!tabButtons.length || !upcomingGrid || !pastGrid) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const target = btn.dataset.target;
      if (target === "past") {
        upcomingGrid.style.display = "none";
        pastGrid.style.display = "grid";
      } else {
        upcomingGrid.style.display = "grid";
        pastGrid.style.display = "none";
      }
    });
  });
}
