/* ============================================================
   GAME
   The main gameplay loop: characters, questions, love,
   scoring, lives, end screens.
   ============================================================ */

const Game = {
  /* All the mutable game state lives here */
  state: {
    score: 0,
    lives: 3,
    love: 0,
    maxMultiplier: 1.0,
    correct: 0,
    wrong: 0,
    charIndex: 0,
    qIndex: 0,
    answered: false
  },

  /* Reset everything and start the first character */
  start() {
    this.state = {
      score: 0, lives: 3, love: 0, maxMultiplier: 1.0,
      correct: 0, wrong: 0, charIndex: 0, qIndex: 0, answered: false
    };
    this.updateHUD();
    this.showCharacterIntro();
  },

  /* Show the character's name, portrait and intro line.
     The "Talk" button below starts the questions. */
  showCharacterIntro() {
    const char = CHARACTERS[this.state.charIndex];

    /* Set the panel background colour via a CSS variable */
    document.querySelector(".character-panel")
      .style.setProperty("--char-color", char.colour);

    document.getElementById("character-name").textContent = char.name;
    document.getElementById("character-image").src = char.image;
    document.getElementById("character-image").alt = char.name + " portrait";
    document.getElementById("character-dialogue").textContent = char.intro;
    document.getElementById("question-text").textContent = "";
    document.getElementById("feedback-msg").textContent = "";

    /* Render a single "Talk" button */
    const answers = document.getElementById("answers-container");
    answers.innerHTML = "";
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = "▶ Talk to " + char.name;
    btn.style.gridColumn = "1 / -1";
    btn.addEventListener("click", () => this.showQuestion());
    answers.appendChild(btn);
  },

  /* Show the current question and four answer buttons */
  showQuestion() {
    const char = CHARACTERS[this.state.charIndex];
    const q = char.questions[this.state.qIndex];

    this.state.answered = false;
    document.getElementById("question-text").textContent = q.text;
    document.getElementById("feedback-msg").textContent = "";

    const answers = document.getElementById("answers-container");
    answers.innerHTML = "";

    q.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.textContent = option;
      btn.addEventListener("click", () => this.answer(index));
      answers.appendChild(btn);
    });
  },

  /* Called when a player clicks an answer */
  answer(selectedIndex) {
    if (this.state.answered) return;  // stop double-clicks
    this.state.answered = true;

    const char = CHARACTERS[this.state.charIndex];
    const q = char.questions[this.state.qIndex];
    const isCorrect = selectedIndex === q.answer;

    /* Colour the buttons */
    document.querySelectorAll(".answer-btn").forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("correct");
      if (i === selectedIndex && !isCorrect) btn.classList.add("wrong");
    });

    let line = "";
    let feedback = "";

    if (isCorrect) {
      /* Increase love FIRST, then calculate points with the new multiplier */
      this.state.love += LOVE_PER_CORRECT;
      const multiplier = 1 + this.state.love * MULTIPLIER_PER_LOVE;
      const points = Math.round(char.basePoints * multiplier);

      this.state.score += points;
      this.state.correct += 1;

      if (multiplier > this.state.maxMultiplier) {
        this.state.maxMultiplier = multiplier;
      }

      line = this.pickDialogue(char, this.state.love);
      feedback = "+" + points + " points";
    } else {
      this.state.wrong += 1;
      this.state.lives -= 1;
      this.state.love = 0;   // love resets on a wrong answer
      line = this.pickRandom(char.dialogue.wrong);
      feedback = "Love reset. " + this.state.lives + " lives left.";
    }

    document.getElementById("character-dialogue").textContent = line;
    document.getElementById("feedback-msg").textContent = feedback;
    this.updateHUD();

    /* Swap the answers for a "Continue" button */
    const answers = document.getElementById("answers-container");
    answers.innerHTML = "";
    const contBtn = document.createElement("button");
    contBtn.className = "answer-btn";
    contBtn.style.gridColumn = "1 / -1";
    contBtn.textContent = this.state.lives <= 0 ? "See Results" : "Continue ▶";
    contBtn.addEventListener("click", () => this.next());
    answers.appendChild(contBtn);
  },

  /* Move to the next question, next character, or end the game */
  next() {
    if (this.state.lives <= 0) {
      this.endGame(true);
      return;
    }

    this.state.qIndex += 1;
    const char = CHARACTERS[this.state.charIndex];

    if (this.state.qIndex < char.questions.length) {
      this.showQuestion();
      return;
    }

    this.state.charIndex += 1;
    this.state.qIndex = 0;

    if (this.state.charIndex >= CHARACTERS.length) {
      this.endGame(false);
      return;
    }
    this.showCharacterIntro();
  },

  /* Save the score and show either the crash or victory screen */
  endGame(crashed) {
    Storage.addScore({
      username: Storage.getCurrentUser(),
      score: this.state.score,
      correct: this.state.correct,
      wrong: this.state.wrong,
      maxMultiplier: this.state.maxMultiplier,
      completed: !crashed,
      date: new Date().toISOString()
    });

    if (crashed) {
      document.getElementById("crash-score").textContent = this.state.score;
      document.getElementById("crash-correct").textContent = this.state.correct;
      document.getElementById("crash-multiplier").textContent =
        this.state.maxMultiplier.toFixed(2) + "x";
      showScreen("screen-crash");
    } else {
      document.getElementById("victory-score").textContent = this.state.score;
      document.getElementById("victory-correct").textContent = this.state.correct;
      document.getElementById("victory-wrong").textContent = this.state.wrong;
      document.getElementById("victory-multiplier").textContent =
        this.state.maxMultiplier.toFixed(2) + "x";
      document.getElementById("victory-romance").textContent = this.getRomanceEnding();
      showScreen("screen-victory");
    }
  },

  /* Different romance line depending on how clean the run was */
  getRomanceEnding() {
    if (this.state.wrong === 0) {
      return "Perfect run. Python, JavaScript, and Rust are all fighting over you.";
    }
    if (this.state.wrong === 1) {
      return "Python wants to see you again. JavaScript is writing a play about you. Rust is pretending not to care.";
    }
    return "They all like you. Some more than others. But that's between you and them.";
  },

  /* Pick a dialogue line based on how much love the player has */
  pickDialogue(char, love) {
    let pool;
    if (love >= 6) pool = char.dialogue.correctHigh;
    else if (love >= 3) pool = char.dialogue.correctMedium;
    else pool = char.dialogue.correctLow;
    return this.pickRandom(pool);
  },

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  /* Repaint the score, love meter, multiplier and lives */
  updateHUD() {
    document.getElementById("score-display").textContent = this.state.score;

    /* Vertical love meter — set both height and width so
       the media query can flip it to horizontal on mobile */
    const percent = Math.min(100, (this.state.love / MAX_LOVE) * 100);
    const fill = document.getElementById("love-fill");
    fill.style.height = percent + "%";
    fill.style.width = percent + "%";

    /* Multiplier */
    const multiplier = 1 + this.state.love * MULTIPLIER_PER_LOVE;
    document.getElementById("love-multiplier").textContent =
      multiplier.toFixed(2) + "x";

    /* Lives as dots */
    const livesEl = document.getElementById("lives-display");
    livesEl.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span");
      dot.className = "life-icon" + (i < this.state.lives ? "" : " lost");
      livesEl.appendChild(dot);
    }
  }
};