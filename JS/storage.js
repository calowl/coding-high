/* ============================================================
   STORAGE
   Wrapper around localStorage. It only stores strings, so
   objects get JSON.stringify'd on save and JSON.parse'd on load.
   ============================================================ */

const Storage = {
  KEYS: {
    users: "codingHigh.users",
    scores: "codingHigh.scores",
    currentUser: "codingHigh.currentUser"
  },

  /* --- USERS --- */
  getUsers() {
    return JSON.parse(localStorage.getItem(this.KEYS.users)) || [];
  },
  saveUsers(users) {
    localStorage.setItem(this.KEYS.users, JSON.stringify(users));
  },
  findUser(username) {
    const lower = username.toLowerCase();
    return this.getUsers().find(u => u.username.toLowerCase() === lower);
  },

  /* --- SCORES --- */
  getScores() {
    return JSON.parse(localStorage.getItem(this.KEYS.scores)) || [];
  },
  saveScores(scores) {
    localStorage.setItem(this.KEYS.scores, JSON.stringify(scores));
  },
  addScore(scoreObject) {
    const scores = this.getScores();
    scores.push(scoreObject);
    this.saveScores(scores);
  },

  /* --- CURRENT SESSION --- */
  getCurrentUser() {
    return localStorage.getItem(this.KEYS.currentUser);
  },
  setCurrentUser(username) {
    localStorage.setItem(this.KEYS.currentUser, username);
  },
  clearCurrentUser() {
    localStorage.removeItem(this.KEYS.currentUser);
  }
};