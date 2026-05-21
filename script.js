const STOP_WORDS = new Set([
  "about", "after", "also", "been", "before", "being", "between", "both",
  "could", "each", "from", "have", "into", "just", "like", "more", "most",
  "much", "only", "other", "over", "same", "some", "such", "than", "that",
  "their", "them", "then", "there", "these", "they", "this", "those",
  "through", "under", "very", "were", "what", "when", "where", "which",
  "while", "with", "would", "your", "will", "shall", "should", "does",
  "done", "make", "made", "many", "well", "even", "still", "because",
]);

const MAX_QUESTIONS = 10;
const MIN_NOTES_LENGTH = 80;

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

const inputScreen = document.getElementById("input-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const notesEl = document.getElementById("notes");
const inputError = document.getElementById("input-error");
const generateBtn = document.getElementById("generate-btn");
const progressEl = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");
const scoreLive = document.getElementById("score-live");
const questionText = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const finalScoreEl = document.getElementById("final-score");
const resultsMessage = document.getElementById("results-message");
const resultsDetail = document.getElementById("results-detail");
const scoreRingFill = document.getElementById("score-ring-fill");
const retryBtn = document.getElementById("retry-btn");
const newNotesBtn = document.getElementById("new-notes-btn");

const OPTION_LETTERS = "ABCDEFGHIJ";
const RING_CIRCUMFERENCE = 327;

function showScreen(screen) {
  [inputScreen, quizScreen, resultsScreen].forEach((el) => {
    el.classList.toggle("active", el === screen);
  });
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom(arr, exclude = []) {
  const pool = arr.filter((item) => !exclude.includes(item));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function extractKeywords(text) {
  const words = text.match(/\b[A-Za-z]{4,}\b/g) || [];
  return [...new Set(
    words
      .map((w) => w.toLowerCase())
      .filter((w) => !STOP_WORDS.has(w))
  )];
}

function parseNotes(text) {
  const chunks = [];
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    const bullet = line.match(/^[-*•]\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    if (bullet || numbered) {
      const content = (bullet || numbered)[1].trim();
      if (content.length > 20) chunks.push({ type: "fact", text: content });
      continue;
    }

    const definition = line.match(/^([^:–-]{2,60})[:–-]\s+(.+)$/);
    if (definition) {
      const term = definition[1].trim();
      const meaning = definition[2].trim();
      if (term.length >= 2 && meaning.length >= 15) {
        chunks.push({ type: "definition", term, meaning });
        continue;
      }
    }

    const sentences = line.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 25);
    for (const sentence of sentences) {
      chunks.push({ type: "sentence", text: sentence.trim() });
    }

    if (sentences.length === 0 && line.length > 25) {
      chunks.push({ type: "sentence", text: line });
    }
  }

  return chunks;
}

function buildOptions(correct, pool, count = 4) {
  const distractors = shuffle(
    pool.filter((item) => item.toLowerCase() !== correct.toLowerCase())
  ).slice(0, count - 1);

  while (distractors.length < count - 1) {
    distractors.push(`Option ${distractors.length + 1}`);
  }

  return shuffle([correct, ...distractors.slice(0, count - 1)]);
}

function questionFromDefinition(def, allDefinitions, allMeanings) {
  const type = Math.random() < 0.5 ? "term" : "meaning";

  if (type === "term") {
    return {
      prompt: `Which term is defined as: "${def.meaning}"?`,
      answer: def.term,
      options: buildOptions(
        def.term,
        allDefinitions.map((d) => d.term)
      ),
    };
  }

  return {
    prompt: `What is the definition of "${def.term}"?`,
    answer: def.meaning,
    options: buildOptions(def.meaning, allMeanings),
  };
}

function questionFromSentence(sentence, keywords) {
  const words = sentence.match(/\b[A-Za-z]{5,}\b/g) || [];
  const candidates = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));

  if (candidates.length === 0) return null;

  const answer = candidates.reduce((best, word) =>
    (word.length > best.length ? word : best), candidates[0]);

  const blanked = sentence.replace(
    new RegExp(`\\b${answer}\\b`, "i"),
    "______"
  );

  if (blanked === sentence) return null;

  const distractorWords = keywords
    .filter((k) => k !== answer.toLowerCase())
    .map((k) => k.charAt(0).toUpperCase() + k.slice(1));

  return {
    prompt: `Fill in the blank:\n"${blanked}"`,
    answer,
    options: buildOptions(answer, distractorWords.length ? distractorWords : candidates),
  };
}

function questionFromFact(fact, allFacts) {
  const keywords = extractKeywords(fact);
  if (keywords.length === 0) {
    return {
      prompt: `True or false: "${fact}"`,
      answer: "True",
      options: ["True", "False"],
    };
  }

  const answerWord = keywords[Math.floor(Math.random() * keywords.length)];
  const regex = new RegExp(`\\b${answerWord}\\b`, "i");
  const blanked = fact.replace(regex, "______");

  if (blanked === fact) {
    return {
      prompt: `Which statement appears in your notes?`,
      answer: fact,
      options: buildOptions(fact, allFacts.map((f) => f.text)),
    };
  }

  return {
    prompt: `Fill in the blank:\n"${blanked}"`,
    answer: answerWord,
    options: buildOptions(
      answerWord.charAt(0).toUpperCase() + answerWord.slice(1),
      keywords.map((k) => k.charAt(0).toUpperCase() + k.slice(1))
    ),
  };
}

function generateQuestions(notes) {
  const chunks = parseNotes(notes);
  const allKeywords = extractKeywords(notes);
  const definitions = chunks.filter((c) => c.type === "definition");
  const sentences = chunks.filter((c) => c.type === "sentence");
  const facts = chunks.filter((c) => c.type === "fact");
  const allMeanings = definitions.map((d) => d.meaning);

  const built = [];

  for (const def of shuffle(definitions)) {
    built.push(
      questionFromDefinition(def, definitions, allMeanings)
    );
  }

  for (const sentence of shuffle(sentences)) {
    const q = questionFromSentence(sentence.text, allKeywords);
    if (q) built.push(q);
  }

  for (const fact of shuffle(facts)) {
    built.push(questionFromFact(fact, facts));
  }

  const unique = [];
  const seen = new Set();

  for (const q of built) {
    const key = q.prompt.slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(q);
  }

  return shuffle(unique).slice(0, MAX_QUESTIONS);
}

function startQuiz() {
  const notes = notesEl.value.trim();
  inputError.hidden = true;

  if (notes.length < MIN_NOTES_LENGTH) {
    inputError.textContent = `Please paste at least ${MIN_NOTES_LENGTH} characters of notes.`;
    inputError.hidden = false;
    return;
  }

  questions = generateQuestions(notes);

  if (questions.length < 3) {
    inputError.textContent =
      "Could not build enough questions. Add more sentences, bullet points, or Term: definition lines.";
    inputError.hidden = false;
    return;
  }

  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const q = questions[currentIndex];
  const total = questions.length;

  progressEl.textContent = `Question ${currentIndex + 1} of ${total}`;
  progressFill.style.width = `${(currentIndex / total) * 100}%`;
  scoreLive.textContent = score;
  questionText.textContent = q.prompt;
  feedbackEl.hidden = true;
  nextBtn.hidden = true;

  optionsEl.innerHTML = "";
  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `
      <span class="option-letter">${OPTION_LETTERS[i]}</span>
      <span class="option-text"></span>
    `;
    btn.querySelector(".option-text").textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option, q.answer));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(btn, selected, correct) {
  if (answered) return;
  answered = true;

  const isCorrect =
    selected.toLowerCase().trim() === correct.toLowerCase().trim();

  if (isCorrect) score++;

  optionsEl.querySelectorAll(".option").forEach((opt) => {
    opt.disabled = true;
    const text = opt.querySelector(".option-text").textContent;
    if (text.toLowerCase().trim() === correct.toLowerCase().trim()) {
      opt.classList.add("correct");
    } else if (opt === btn && !isCorrect) {
      opt.classList.add("wrong");
    }
  });

  feedbackEl.hidden = false;
  feedbackEl.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
  feedbackEl.querySelector(".feedback-text").textContent = isCorrect
    ? "Correct — well recalled."
    : `The answer is: ${correct}`;
  scoreLive.textContent = score;
  nextBtn.hidden = false;
  nextBtn.querySelector(".next-btn-label").textContent =
    currentIndex === questions.length - 1 ? "View Results" : "Next Question";
}

function showResults() {
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  finalScoreEl.textContent = `${pct}%`;
  resultsDetail.textContent = `${score} of ${total} correct`;
  resultsMessage.textContent =
    pct === 100
      ? "Flawless recall"
      : pct >= 70
        ? "Strong performance"
        : "Room to improve";

  scoreRingFill.style.strokeDashoffset = RING_CIRCUMFERENCE;
  showScreen(resultsScreen);

  requestAnimationFrame(() => {
    scoreRingFill.style.strokeDashoffset =
      RING_CIRCUMFERENCE - (pct / 100) * RING_CIRCUMFERENCE;
  });
}

function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    progressFill.style.width = "100%";
    showResults();
  }
}

generateBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
retryBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  questions = shuffle(questions);
  scoreRingFill.style.strokeDashoffset = RING_CIRCUMFERENCE;
  showScreen(quizScreen);
  renderQuestion();
});
newNotesBtn.addEventListener("click", () => {
  showScreen(inputScreen);
});
