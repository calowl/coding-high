/* ============================================================
   LEADERBOARD
   Reads scores from storage, sorts them, renders the top 10.
   ============================================================ */

const Leaderboard = {
  /* Return top 10 sorted by score, then earliest date */
  getTopScores() {
    return Storage.getScores()
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(a.date) - new Date(b.date);
      })
      .slice(0, 10);
  },

  render() {
    const tbody = document.getElementById("leaderboard-body");
    const emptyMsg = document.getElementById("leaderboard-empty");
    const top = this.getTopScores();

    tbody.innerHTML = "";

    if (top.length === 0) {
      emptyMsg.classList.remove("hidden");
      return;
    }
    emptyMsg.classList.add("hidden");

    const currentUser = Storage.getCurrentUser();

    top.forEach((score, index) => {
      const row = document.createElement("tr");
      if (score.username === currentUser) {
        row.classList.add("current-user");
      }

      const dateStr = new Date(score.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${this.escapeHtml(score.username)}</td>
        <td>${score.score}</td>
        <td>${score.correct}</td>
        <td>${score.maxMultiplier.toFixed(2)}x</td>
        <td>${dateStr}</td>
      `;
      tbody.appendChild(row);
    });
  },

  /* Stops a username like "<script>" from running as HTML */
  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};