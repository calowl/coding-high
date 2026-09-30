/* ============================================================
   DATA
   All characters, dialogue and questions. Kept separate from
   logic so content is easy to edit.
   ============================================================ */

const CHARACTERS = [
  /* ----------------------------------------------------------
     PYTHON — childhood best friend. Easy difficulty.
     ---------------------------------------------------------- */
  {
    id: "python",
    name: "Python",
    initials: "PY",
    colour: "#3776AB",
    image: "../assets/python.png",
    basePoints: 100,
    intro: "Hey... it's been a while. I've missed you, you know.",
    dialogue: {
      correctLow: [
        "Nice one! Knew you had it in you.",
        "See? You still remember."
      ],
      correctMedium: [
        "You're really good at this... I'm glad we grew up together.",
        "I forgot how nice it is to just... talk to you."
      ],
      correctHigh: [
        "I... I think I'm falling for you. Don't make it weird.",
        "Every question you get right, I like you a little more."
      ],
      wrong: [
        "It's okay. We've all indented wrong before.",
        "Don't worry. We'll get the next one together."
      ]
    },
    questions: [
      {
        text: "What does print(\"Hello\") do?",
        options: [
          "Creates a variable called Hello",
          "Prints Hello to the screen",
          "Deletes Hello",
          "Nothing happens"
        ],
        answer: 1
      },
      {
        text: "How do you create a list in Python?",
        options: [
          "list = (1, 2, 3)",
          "list = [1, 2, 3]",
          "list = {1, 2, 3}",
          "list = <1, 2, 3>"
        ],
        answer: 1
      },
      {
        text: "What symbol starts a comment in Python?",
        options: ["//", "/*", "#", "--"],
        answer: 2
      }
    ]
  },

  /* ----------------------------------------------------------
     JAVASCRIPT — method actor. Medium difficulty.
     ---------------------------------------------------------- */
  {
    id: "javascript",
    name: "JavaScript",
    initials: "JS",
    colour: "#F7DF1E",
    image: "../assets/JS.png",
    basePoints: 150,
    intro: "And so the player arrives... cue the dramatic music. Not literally. We have no budget.",
    dialogue: {
      correctLow: [
        "Adequate. The audience is mildly pleased.",
        "The crowd stirs... cautiously."
      ],
      correctMedium: [
        "You're the co-star I've been waiting for.",
        "The critics will write sonnets about you."
      ],
      correctHigh: [
        "Forget the script. You're my leading role.",
        "I would rewrite the entire DOM for you."
      ],
      wrong: [
        "The audience gasps. The player has failed. Dramatically.",
        "A tragedy in one act. Two acts. Three."
      ]
    },
    questions: [
      {
        text: "What's the difference between let and const?",
        options: [
          "let is for numbers, const is for strings",
          "let can be reassigned, const cannot",
          "const is faster",
          "There is no difference"
        ],
        answer: 1
      },
      {
        text: "What does === check compared to ==?",
        options: [
          "=== checks value only",
          "=== checks value and type",
          "They are identical",
          "=== is for strings only"
        ],
        answer: 1
      },
      {
        text: "What does NaN stand for?",
        options: ["Not a Null", "Not a Number", "New and Null", "Null and None"],
        answer: 1
      }
    ]
  },

  /* ----------------------------------------------------------
     RUST — cranky janitor. Hard difficulty.
     ---------------------------------------------------------- */
  {
    id: "rust",
    name: "Rust",
    initials: "RS",
    colour: "#CE422B",
    image: "../assets/rust.png",
    basePoints: 200,
    intro: "Oh. You. Great. Let me guess — you're gonna ask me about borrow checking.",
    dialogue: {
      correctLow: [
        "Huh. You didn't screw up. Don't make it a habit.",
        "Fine. You're less useless than I thought."
      ],
      correctMedium: [
        "Okay, okay. You might actually know what you're doing.",
        "I... don't hate having you around. Don't read into it."
      ],
      correctHigh: [
        "I... I mopped this floor for you. Don't read into it.",
        "Fine. FINE. You're my favourite. Happy now?"
      ],
      wrong: [
        "Typical. You'd forget to free that too.",
        "Congratulations. You just leaked my patience."
      ]
    },
    questions: [
      {
        text: "In Rust, what keyword makes a variable mutable?",
        options: ["var", "mut", "let", "change"],
        answer: 1
      },
      {
        text: "What file manages dependencies in a Rust project?",
        options: ["package.json", "requirements.txt", "Cargo.toml", "Makefile"],
        answer: 2
      },
      {
        text: "What does Rust's ownership system prevent?",
        options: [
          "Slow code",
          "Memory leaks and data races",
          "Long compile times",
          "Using too many libraries"
        ],
        answer: 1
      }
    ]
  }
];

/* Tuning values used by game.js */
const MAX_LOVE = 9;
const LOVE_PER_CORRECT = 1;
const MULTIPLIER_PER_LOVE = 0.25;