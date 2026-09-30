/* ============================================================
   LOGIN PAGE
   Handles the login/register form on login.html.
   On success, redirects to index.html.
   ============================================================ */

/* Already logged in? Skip to the game */
window.addEventListener("DOMContentLoaded", () => {
  if (Auth.isLoggedIn()) {
    window.location.href = "index.html";
  }
});

/* Toggle between login and register forms */
document.getElementById("show-register").addEventListener("click", () => {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.remove("hidden");
  document.getElementById("register-error").textContent = "";
});

document.getElementById("show-login").addEventListener("click", () => {
  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("login-error").textContent = "";
});

/* Log in */
document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");

  const result = await Auth.login(username, password);
  if (!result.success) {
    errorEl.textContent = result.message;
    return;
  }
  window.location.href = "index.html";
});

/* Register */
document.getElementById("register-btn").addEventListener("click", async () => {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;
  const errorEl = document.getElementById("register-error");

  const result = await Auth.register(username, password, confirm);
  if (!result.success) {
    errorEl.textContent = result.message;
    return;
  }

  /* Clear fields, prefill login username, switch forms */
  document.getElementById("register-username").value = "";
  document.getElementById("register-password").value = "";
  document.getElementById("register-confirm").value = "";
  document.getElementById("login-username").value = username;
  document.getElementById("show-login").click();
  document.getElementById("login-error").textContent = "Account created. Please log in.";
});