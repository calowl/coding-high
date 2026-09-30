/* ============================================================
   APP
   Wires everything together. Screen switching + button events.
   No game logic in here — just glue.
   ============================================================ */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* --- MENU --- */
document.getElementById("start-game-btn").addEventListener("click", () => {
  Game.start();
  showScreen("screen-game");
});

document.getElementById("view-leaderboard-btn").addEventListener("click", () => {
  Leaderboard.render();
  showScreen("screen-leaderboard");
});

document.getElementById("logout-btn").addEventListener("click", () => {
  Auth.logout();
  window.location.href = "login.html";
});

/* --- LEADERBOARD --- */
document.getElementById("back-to-menu-btn").addEventListener("click", () => {
  showScreen("screen-menu");
});

/* --- END SCREENS --- */
document.getElementById("crash-retry-btn").addEventListener("click", () => {
  Game.start();
  showScreen("screen-game");
});

document.getElementById("crash-menu-btn").addEventListener("click", () => {
  showScreen("screen-menu");
});

document.getElementById("victory-leaderboard-btn").addEventListener("click", () => {
  Leaderboard.render();
  showScreen("screen-leaderboard");
});

document.getElementById("victory-menu-btn").addEventListener("click", () => {
  showScreen("screen-menu");
});

/* --- STARTUP --- */
/* If not logged in, redirect to login.html */
window.addEventListener("DOMContentLoaded", () => {
  if (Auth.isLoggedIn()) {
    document.getElementById("welcome-msg").textContent =
      "Welcome back, " + Storage.getCurrentUser() + ".";
    showScreen("screen-menu");
  } else {
    window.location.href = "login.html";
  }
});