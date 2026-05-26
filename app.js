const STORAGE_KEY = "lingualift-progress";

const screens = {
  home: document.getElementById("screen-home"),
  course: document.getElementById("screen-course"),
  lesson: document.getElementById("screen-lesson"),
  quiz: document.getElementById("screen-quiz"),
  results: document.getElementById("screen-results"),
};

const backBtn = document.getElementById("back-btn");
const headerSub = document.getElementById("header-sub");
const headerXp = document.getElementById("header-xp");
const headerXpValue = document.getElementById("header-xp-value");
const languageGrid = document.getElementById("language-grid");
const lessonList = document.getElementById("lesson-list");
const fluencyPercent = document.getElementById("fluency-percent");
const fluencyFill = document.getElementById("fluency-fill");
const fluencyDetail = document.getElementById("fluency-detail");
const courseFlag = document.getElementById("course-flag");
const courseTitle = document.getElementById("course-title");
const courseLevel = document.getElementById("course-level");
const lessonNumber = document.getElementById("lesson-number");
const lessonTitle = document.getElementById("lesson-title");
const lessonGrammar = document.getElementById("lesson-grammar");
const vocabList = document.getElementById("vocab-list");
const phraseList = document.getElementById("phrase-list");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizProgress = document.getElementById("quiz-progress");
const quizProgressFill = document.getElementById("quiz-progress-fill");
const quizScoreLive = document.getElementById("quiz-score-live");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizInput = document.getElementById("quiz-input");
const quizSubmit = document.getElementById("quiz-submit");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const resultsEmoji = document.getElementById("results-emoji");
const resultsTitle = document.getElementById("results-title");
const resultsScore = document.getElementById("results-score");
const resultsXp = document.getElementById("results-xp");
const resultsFluency = document.getElementById("results-fluency");
const resultsContinue = document.getElementById("results-continue");
const resultsRetry = document.getElementById("results-retry");

let state = {
  lang: null,
  lessonId: null,
  quizIndex: 0,
  quizCorrect: 0,
  quizAnswered: false,
  questions: [],
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLangProgress(lang) {
  const all = loadProgress();
  if (!all[lang]) {
    all[lang] = { completed: [], bestScores: {} };
  }
  return all[lang];
}

function calcFluency(lang) {
  const course = COURSES[lang];
  if (!course) return 0;
  const prog = getLangProgress(lang);
  const total = course.lessons.length;
  const done = prog.completed.length;
  return total ? Math.round((done / total) * 100) : 0;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });
  backBtn.hidden = name === "home";
  headerXp.hidden = !state.lang || name === "home";
  if (state.lang) {
    headerXpValue.textContent = `${calcFluency(state.lang)}%`;
  }
}

function navigateBack() {
  const active = Object.keys(screens).find((k) => screens[k].classList.contains("active"));
  if (active === "course" || active === "results") {
    showCourse(state.lang);
  } else if (active === "lesson" || active === "quiz") {
    openLesson(state.lang, state.lessonId);
  } else {
    showHome();
  }
}

function showHome() {
  state.lang = null;
  state.lessonId = null;
  headerSub.textContent = "Learn languages through lessons & quizzes";
  renderLanguageGrid();
  showScreen("home");
}

function renderLanguageGrid() {
  languageGrid.innerHTML = "";
  Object.entries(COURSES).forEach(([id, course]) => {
    const fluency = calcFluency(id);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "language-card";
    card.innerHTML = `
      <span class="language-card-flag">${course.flag}</span>
      <span class="language-card-name">${course.name}</span>
      <span class="language-card-native">${course.native}</span>
      <span class="language-card-meta">${course.lessons.length} lessons · ${fluency}% fluency</span>
    `;
    card.addEventListener("click", () => showCourse(id));
    languageGrid.appendChild(card);
  });
}

function showCourse(lang) {
  state.lang = lang;
  state.lessonId = null;
  const course = COURSES[lang];
  const fluency = calcFluency(lang);
  const prog = getLangProgress(lang);

  courseFlag.textContent = course.flag;
  courseTitle.textContent = course.name;
  courseLevel.textContent = course.native;
  headerSub.textContent = `${course.name} course`;
  fluencyPercent.textContent = `${fluency}%`;
  fluencyFill.style.width = `${fluency}%`;
  fluencyDetail.textContent = `${prog.completed.length} of ${course.lessons.length} lessons complete`;

  lessonList.innerHTML = "";
  course.lessons.forEach((lesson, i) => {
    const done = prog.completed.includes(lesson.id);
    const best = prog.bestScores[lesson.id];
    const item = document.createElement("button");
    item.type = "button";
    item.className = `lesson-item${done ? " done" : ""}`;
    item.innerHTML = `
      <span class="lesson-item-num">${i + 1}</span>
      <div class="lesson-item-body">
        <span class="lesson-item-title">${lesson.title}</span>
        <span class="lesson-item-meta">${lesson.vocab.length} words · ${lesson.quiz.length} quiz questions${best != null ? ` · Best ${best}%` : ""}</span>
      </div>
      <span class="lesson-item-status">${done ? "✓" : "→"}</span>
    `;
    item.addEventListener("click", () => openLesson(lang, lesson.id));
    lessonList.appendChild(item);
  });

  showScreen("course");
}

function openLesson(lang, lessonId) {
  state.lang = lang;
  state.lessonId = lessonId;
  const lesson = COURSES[lang].lessons.find((l) => l.id === lessonId);

  lessonNumber.textContent = `Lesson ${lesson.id}`;
  lessonTitle.textContent = lesson.title;
  lessonGrammar.textContent = lesson.grammar;

  vocabList.innerHTML = lesson.vocab
    .map(
      (v) => `
      <div class="vocab-card">
        <span class="vocab-term">${v.term}</span>
        <span class="vocab-meaning">${v.meaning}</span>
      </div>`
    )
    .join("");

  phraseList.innerHTML = lesson.phrases
    .map(
      (p) => `
      <div class="phrase-card">
        <span class="phrase-term">${p.term}</span>
        <span class="phrase-meaning">${p.meaning}</span>
      </div>`
    )
    .join("");

  showScreen("lesson");
}

function normalize(s) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function startQuiz() {
  const lesson = COURSES[state.lang].lessons.find((l) => l.id === state.lessonId);
  state.questions = shuffle([...lesson.quiz]);
  state.quizIndex = 0;
  state.quizCorrect = 0;
  state.quizAnswered = false;
  showScreen("quiz");
  renderQuizQuestion();
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderQuizQuestion() {
  const q = state.questions[state.quizIndex];
  const total = state.questions.length;

  quizProgress.textContent = `Question ${state.quizIndex + 1} of ${total}`;
  quizProgressFill.style.width = `${(state.quizIndex / total) * 100}%`;
  quizScoreLive.textContent = `${state.quizCorrect} correct`;
  quizQuestion.textContent = q.q;
  quizFeedback.hidden = true;
  quizNext.hidden = true;
  quizOptions.innerHTML = "";
  quizInput.hidden = true;
  quizSubmit.hidden = true;
  state.quizAnswered = false;

  if (q.type === "mcq") {
    shuffle([...q.options]).forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => checkAnswer(opt, q.a));
      quizOptions.appendChild(btn);
    });
  } else {
    quizInput.hidden = false;
    quizSubmit.hidden = false;
    quizInput.value = "";
    quizInput.focus();
    quizSubmit.onclick = () => checkAnswer(quizInput.value, q.a);
    quizInput.onkeydown = (e) => {
      if (e.key === "Enter") checkAnswer(quizInput.value, q.a);
    };
  }
}

function checkAnswer(selected, correct) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;

  const isCorrect = normalize(selected) === normalize(correct);
  if (isCorrect) state.quizCorrect++;

  if (state.questions[state.quizIndex].type === "mcq") {
    quizOptions.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.disabled = true;
      if (normalize(btn.textContent) === normalize(correct)) btn.classList.add("correct");
      else if (btn.textContent === selected && !isCorrect) btn.classList.add("wrong");
    });
  } else {
    quizInput.disabled = true;
    quizSubmit.hidden = true;
  }

  quizFeedback.hidden = false;
  quizFeedback.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"}`;
  quizFeedback.textContent = isCorrect
    ? "Correct!"
    : `Not quite. The answer is: ${correct}`;
  quizNext.hidden = false;
  quizNext.textContent =
    state.quizIndex === state.questions.length - 1 ? "See results" : "Next question";
}

function finishQuiz() {
  const total = state.questions.length;
  const pct = Math.round((state.quizCorrect / total) * 100);
  const passed = pct >= 70;
  const all = loadProgress();
  const prog = getLangProgress(state.lang);

  if (passed) {
    if (!prog.completed.includes(state.lessonId)) {
      prog.completed.push(state.lessonId);
    }
  }

  const prevBest = prog.bestScores[state.lessonId] || 0;
  prog.bestScores[state.lessonId] = Math.max(prevBest, pct);
  all[state.lang] = prog;
  saveProgress(all);

  resultsEmoji.textContent = passed ? "🎉" : "📚";
  resultsTitle.textContent = passed ? "Lesson passed!" : "Keep practicing";
  resultsScore.textContent = `${state.quizCorrect} / ${total} correct (${pct}%)`;
  resultsXp.textContent = passed
    ? "+20 fluency points toward your goal"
    : "Score 70% or higher to complete this lesson";
  resultsFluency.textContent = `Course fluency: ${calcFluency(state.lang)}%`;

  showScreen("results");
}

backBtn.addEventListener("click", navigateBack);
startQuizBtn.addEventListener("click", startQuiz);
quizNext.addEventListener("click", () => {
  if (state.quizIndex < state.questions.length - 1) {
    state.quizIndex++;
    renderQuizQuestion();
  } else {
    quizProgressFill.style.width = "100%";
    finishQuiz();
  }
});
resultsContinue.addEventListener("click", () => showCourse(state.lang));
resultsRetry.addEventListener("click", () => startQuiz());

showHome();
