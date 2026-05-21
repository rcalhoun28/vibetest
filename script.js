const LENGTH_TARGETS = {
  brief: 400,
  standard: 750,
  extended: 1200,
  comprehensive: 2000,
};

const STOP = new Set([
  "about", "after", "also", "analyze", "argue", "been", "being", "between",
  "could", "discuss", "each", "essay", "explain", "from", "have", "into",
  "just", "like", "make", "many", "more", "most", "much", "only", "other",
  "over", "same", "some", "such", "than", "that", "their", "them", "then",
  "there", "these", "they", "this", "those", "through", "under", "very",
  "were", "what", "when", "where", "which", "while", "with", "would", "your",
  "write", "how", "does", "will", "should", "topic", "paper",
]);

const LENSES = [
  "historical development",
  "institutional structures",
  "economic incentives",
  "cultural representation",
  "ethical implications",
  "power relations",
  "technological mediation",
  "comparative frameworks",
];

const SYNTHESIS = [
  "When considered alongside",
  "In tension with this view",
  "Synthesizing these strands",
  "This analysis converges with",
  "A more integrative reading suggests",
  "Cross-cutting this debate",
  "The interplay between",
  "Situated within broader discourse",
];

const TRANSITIONS = [
  "Furthermore",
  "Nevertheless",
  "Consequently",
  "By contrast",
  "Equally significant",
  "Building on this foundation",
  "At a deeper level",
  "In this regard",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function cleanTopic(prompt) {
  return prompt
    .replace(/^(write an essay (on|about)|discuss|analyze|explore|examine)\s+/i, "")
    .replace(/\?+$/, "")
    .trim();
}

function extractTerms(prompt) {
  const words = prompt.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
  const terms = [...new Set(words.filter((w) => !STOP.has(w)))];
  if (terms.length < 3) {
    const fallback = prompt.split(/\s+/).filter((w) => w.length > 3).slice(0, 6);
    return fallback.map((w) => w.toLowerCase());
  }
  return terms.slice(0, 8);
}

function topicPhrase(topic) {
  const t = topic.trim();
  if (/^(the|a|an)\s/i.test(t)) return t;
  return `the question of ${t}`;
}

function buildThesis(topic, terms) {
  const focus = terms.slice(0, 2).join(" and ") || topic;
  const templates = [
    `This essay argues that ${topicPhrase(topic)} must be understood not as a single phenomenon but as a contested field in which ${focus} shape outcomes in ways that resist simplistic explanation.`,
    `A rigorous account of ${topicPhrase(topic)} reveals that ${focus} operate interdependently, producing effects that cannot be reduced to either structural or individual causes alone.`,
    `The central claim advanced here is that ${topicPhrase(topic)} demands synthetic analysis: only by integrating multiple disciplinary lenses can we grasp how ${focus} jointly configure the problem.`,
  ];
  return pick(templates);
}

function expandSentence(base, targetWords) {
  let text = base;
  const elaborations = [
    ` Such dynamics are neither accidental nor merely contextual; they reflect deeper patterns of organization and meaning.`,
    ` Scholars have long debated the mechanisms involved, yet the most persuasive accounts emphasize relational rather than isolated causation.`,
    ` This is not to deny countervailing forces, but to insist that any adequate framework must hold competing explanations in productive tension.`,
    ` Empirical cases illustrate the point: where interventions ignore structural constraints, reform remains partial at best.`,
    ` The implications extend beyond immediate settings, bearing on how institutions allocate legitimacy and resources.`,
    ` Read against alternative paradigms, the same evidence supports a more nuanced, dialectical interpretation.`,
  ];
  while (text.split(/\s+/).length < targetWords && elaborations.length) {
    text += pick(elaborations);
  }
  return text;
}

function bodyParagraph(topic, terms, lens, index) {
  const term = terms[index % terms.length] || "core concepts";
  const syn = pick(SYNTHESIS);
  const trans = pick(TRANSITIONS);
  const openers = [
    `${trans}, an examination of ${lens} clarifies how ${term} mediates our understanding of ${topicPhrase(topic)}.`,
    `From the vantage of ${lens}, ${term} emerges not as peripheral but as structurally constitutive of the debate surrounding ${topic}.`,
    `${capitalize(lens)} offers a critical entry point: through it, we see that ${term} reconfigures assumptions that often go unexamined in popular discourse.`,
  ];
  const bridges = [
    `${syn} ${pick(LENSES.filter((l) => l !== lens))}, we find that material conditions and symbolic forms co-produce the phenomena under review.`,
    `${syn} prevailing narratives about ${pick(terms)}, it becomes clear that explanation requires multi-causal models rather than monocausal stories.`,
    `What this synthesis yields is a richer map of ${topicPhrase(topic)}—one that accounts for agency, constraint, and contingency simultaneously.`,
  ];
  const closers = [
    ` Critics may object that this framework overstates complexity; yet oversimplification has historically obscured precisely the tensions this analysis foregrounds.`,
    ` Thus the paragraph's argument advances: ${lens} is indispensable for interpreting how ${term} functions within the larger argumentative arc.`,
    ` Taken together, these observations reinforce the essay's thesis while opening space for further inquiry.`,
  ];
  return expandSentence(`${pick(openers)} ${pick(bridges)} ${pick(closers)}`, 120 + index * 15);
}

function buildConclusion(topic, terms) {
  const t = terms[0] || "the subject";
  return expandSentence(
    `In conclusion, the preceding analysis demonstrates that ${topicPhrase(topic)} rewards interdisciplinary synthesis rather than narrow specialization. ` +
      `By weaving together perspectives on ${terms.slice(0, 3).join(", ") || t}, this essay has argued for a position that is at once critical and constructive: ` +
      `recognizing limits in dominant frameworks while articulating a more capacious alternative. ` +
      `Future research should pursue comparative and longitudinal studies, testing whether the integrative model developed here holds across varied contexts. ` +
      `Ultimately, the stakes are not merely academic; how we conceptualize ${topic} shapes the policies, practices, and public conversations that follow.`,
    100
  );
}

function buildIntroduction(topic, thesis) {
  return expandSentence(
    `${capitalize(topicPhrase(topic))} occupies a central place in contemporary scholarship, yet accounts often talk past one another. ` +
      `Some emphasize structural determination; others privilege agency, discourse, or technological change. ` +
      `What unites these divergent approaches is a shared recognition that the issue resists easy resolution. ` +
      `${thesis}`,
    110
  );
}

function padToTarget(paragraphs, target) {
  const filler = expandSentence(
    ` Additional reflection confirms that the argument's internal logic coheres: each section builds on the last, ` +
      `deepening the reader's grasp of interlocking causes and consequences without abandoning analytical precision.`,
    50
  );
  let total = paragraphs.join(" ").split(/\s+/).length;
  let i = 0;
  while (total < target * 0.95 && i < 6) {
    paragraphs.splice(paragraphs.length - 1, 0, filler);
    total = paragraphs.join(" ").split(/\s+/).length;
    i++;
  }
  return paragraphs;
}

function generateEssay(prompt, lengthKey = "standard") {
  const topic = cleanTopic(prompt);
  const terms = extractTerms(prompt);
  const target = LENGTH_TARGETS[lengthKey] || LENGTH_TARGETS.standard;
  const thesis = buildThesis(topic, terms);

  const bodyCount =
    lengthKey === "brief" ? 3 : lengthKey === "standard" ? 4 : lengthKey === "extended" ? 5 : 6;

  const lenses = pickN(LENSES, bodyCount);
  const paragraphs = [buildIntroduction(topic, thesis)];

  lenses.forEach((lens, i) => {
    paragraphs.push(bodyParagraph(topic, terms, lens, i));
  });

  paragraphs.push(buildConclusion(topic, terms));

  const padded = padToTarget(paragraphs, target);
  return padded.join("\n\n");
}

const LENGTH_LABELS = {
  brief: "Brief (~400 words)",
  standard: "Standard (~750 words)",
  extended: "Extended (~1,200 words)",
  comprehensive: "Comprehensive (~2,000 words)",
};

const MIN_PROMPT_LENGTH = 15;

const inputScreen = document.getElementById("input-screen");
const essayScreen = document.getElementById("essay-screen");
const promptEl = document.getElementById("prompt");
const lengthEl = document.getElementById("length");
const inputError = document.getElementById("input-error");
const generateBtn = document.getElementById("generate-btn");
const essayOutput = document.getElementById("essay-output");
const essayTopic = document.getElementById("essay-topic");
const wordCountEl = document.getElementById("word-count");
const loadingEl = document.getElementById("loading");
const copyBtn = document.getElementById("copy-btn");
const newEssayBtn = document.getElementById("new-essay-btn");

let essayText = "";

function showScreen(screen) {
  [inputScreen, essayScreen].forEach((el) => {
    el.classList.toggle("active", el === screen);
  });
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function formatEssay(text) {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return "";

  return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function renderEssay(streaming = false) {
  if (!essayText.trim()) {
    essayOutput.innerHTML = "";
    return;
  }

  if (streaming) {
    essayOutput.classList.add("streaming");
    essayOutput.innerHTML = `<p class="streaming-p">${escapeHtml(essayText)}</p>`;
  } else {
    essayOutput.classList.remove("streaming");
    essayOutput.innerHTML = formatEssay(essayText);
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function updateWordCount() {
  const count = countWords(essayText);
  wordCountEl.textContent = count > 0 ? `${count} words` : "";
}

function setLoading(on) {
  loadingEl.hidden = !on;
  essayOutput.classList.toggle("generating", on);
  generateBtn.disabled = on;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function streamEssay(fullText) {
  const words = fullText.split(/(\s+)/);
  essayText = "";

  for (let i = 0; i < words.length; i++) {
    essayText += words[i];
    renderEssay(true);
    updateWordCount();
    essayOutput.scrollTop = essayOutput.scrollHeight;
    if (i % 4 === 0) await sleep(12);
  }

  renderEssay(false);
  updateWordCount();
}

async function handleGenerate() {
  const prompt = promptEl.value.trim();
  const length = lengthEl.value;

  inputError.hidden = true;

  if (prompt.length < MIN_PROMPT_LENGTH) {
    inputError.textContent = "Please enter a more detailed prompt (at least 15 characters).";
    inputError.hidden = false;
    return;
  }

  essayText = "";
  essayOutput.innerHTML = "";
  essayTopic.textContent = truncate(prompt, 80);
  wordCountEl.textContent = LENGTH_LABELS[length];
  showScreen(essayScreen);
  setLoading(true);

  await sleep(600);

  try {
    const fullEssay = generateEssay(prompt, length);
    setLoading(false);
    await streamEssay(fullEssay);
  } catch {
    setLoading(false);
    showScreen(inputScreen);
    inputError.textContent = "Something went wrong generating your essay. Please try again.";
    inputError.hidden = false;
  }
}

function truncate(str, max) {
  return str.length <= max ? str : `${str.slice(0, max)}…`;
}

generateBtn.addEventListener("click", handleGenerate);

copyBtn.addEventListener("click", async () => {
  if (!essayText) return;
  await navigator.clipboard.writeText(essayText);
  copyBtn.classList.add("copied");
  setTimeout(() => copyBtn.classList.remove("copied"), 2000);
});

newEssayBtn.addEventListener("click", () => {
  showScreen(inputScreen);
});
