/* ============================================================
   AUTH
   Register, login, logout.
   Passwords are hashed with SHA-256 before being stored,
   so plain text is never saved anywhere.
   ============================================================ */

const Auth = {
  /* Turn a password into a hex hash string */
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  },

  async register(username, password, confirmPassword) {
    username = username.trim();

    if (username.length < 3) {
      return { success: false, message: "Username must be at least 3 characters." };
    }
    if (password.length < 4) {
      return { success: false, message: "Password must be at least 4 characters." };
    }
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }
    if (Storage.findUser(username)) {
      return { success: false, message: "That username is already taken." };
    }

    const passwordHash = await this.hashPassword(password);
    const users = Storage.getUsers();
    users.push({
      username: username,
      passwordHash: passwordHash,
      createdAt: new Date().toISOString()
    });
    Storage.saveUsers(users);

    return { success: true };
  },

  async login(username, password) {
    username = username.trim();

    if (!username || !password) {
      return { success: false, message: "Please fill in both fields." };
    }

    const user = Storage.findUser(username);
    if (!user) {
      return { success: false, message: "Incorrect username or password." };
    }

    const attemptHash = await this.hashPassword(password);
    if (attemptHash !== user.passwordHash) {
      return { success: false, message: "Incorrect username or password." };
    }

    Storage.setCurrentUser(user.username);
    return { success: true, username: user.username };
  },

  logout() {
    Storage.clearCurrentUser();
  },

  isLoggedIn() {
    return Storage.getCurrentUser() !== null;
  }
};