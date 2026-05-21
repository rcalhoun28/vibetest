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

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function expandSentence(base, targetWords) {
  let text = base;
  const elaborations = shuffle([
    ` Such dynamics are neither accidental nor merely contextual; they reflect deeper patterns of organization and meaning.`,
    ` Scholars have long debated the mechanisms involved, yet the most persuasive accounts emphasize relational rather than isolated causation.`,
    ` This is not to deny countervailing forces, but to insist that any adequate framework must hold competing explanations in productive tension.`,
    ` Empirical cases illustrate the point: where interventions ignore structural constraints, reform remains partial at best.`,
    ` The implications extend beyond immediate settings, bearing on how institutions allocate legitimacy and resources.`,
    ` Read against alternative paradigms, the same evidence supports a more nuanced, dialectical interpretation.`,
    ` Attention to marginal cases often reveals assumptions embedded in dominant theories that otherwise pass unnoticed.`,
    ` The cumulative weight of evidence suggests a reframing rather than a minor revision of conventional wisdom.`,
  ]);
  let i = 0;
  while (wordCount(text) < targetWords && i < elaborations.length) {
    text += elaborations[i++];
  }
  return text;
}

function bodyParagraph(topic, terms, lens, index) {
  const term = terms[index % terms.length] || "core concepts";
  const term2 = terms[(index + 1) % terms.length] || term;
  const otherLens = pick(LENSES.filter((l) => l !== lens));
  const syn = pick(SYNTHESIS);
  const trans = pick(TRANSITIONS);

  const variants = [
    `${trans}, an examination of ${lens} clarifies how ${term} mediates our understanding of ${topicPhrase(topic)}. ${syn} ${otherLens}, material and symbolic dimensions co-produce outcomes that neither alone can explain. The paragraph thus advances a relational account in which ${term2} remains central rather than ornamental.`,
    `From the vantage of ${lens}, ${term} emerges as structurally constitutive of debates surrounding ${topic}. Rather than treating ${term2} as background context, this section positions it as an active variable. ${syn} dominant narratives, multi-causal explanation displaces stories that privilege a single lever of change.`,
    `${capitalize(lens)} reframes familiar disputes about ${topic}: ${term} reconfigures what counts as evidence and what counts as consequence. ${trans}, linking ${term2} to wider patterns avoids the trap of anecdotal particularism. Critics who demand simpler models overlook how complexity itself is often the phenomenon to be explained.`,
    `If ${lens} is taken seriously, ${term} cannot be bracketed when assessing ${topicPhrase(topic)}. ${syn} inquiries into ${otherLens}, the analysis shows reciprocal determination between structure and practice. This reciprocity is precisely what synthetic scholarship must make visible for ${term2} and related concepts.`,
  ];

  return expandSentence(pick(variants), 115 + index * 12);
}

function buildConclusion(topic, terms) {
  const t = terms[0] || "the subject";
  const variants = [
    `In conclusion, ${topicPhrase(topic)} rewards interdisciplinary synthesis rather than narrow specialization. Perspectives on ${terms.slice(0, 3).join(", ") || t} converge on a critical yet constructive stance. Future inquiry should test this integrative model across contexts while remaining alert to power, history, and lived experience.`,
    `To conclude, the essay has argued that ${topicPhrase(topic)} is best approached through layered analysis rather than single-factor explanation. Themes of ${terms.slice(0, 2).join(" and ") || t} thread through each section, demonstrating deep synthesis. What remains is to carry this framework into research, teaching, and public debate with equal rigor.`,
    `Ultimately, understanding ${topicPhrase(topic)} requires holding ${t} and related concepts in deliberate tension. The preceding sections have mapped that tension without resolving it prematurely. Such restraint is a strength: it invites continued scholarship and more democratic deliberation about consequences that follow from how we define the problem.`,
  ];
  return expandSentence(pick(variants), 95);
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

function buildCounterargumentParagraph(topic, terms) {
  const term = pick(terms);
  return expandSentence(
    `A substantive objection holds that analyses of ${topicPhrase(topic)} exaggerate the salience of ${term} at the expense of ordinary experience. ` +
      `Proponents of this view argue that everyday practice often diverges from theoretical models, and that policy should therefore heed local knowledge. ` +
      `While this critique deserves serious engagement, it risks conflating descriptive variation with evidence against structural explanation. ` +
      `Reconciling these positions requires distinguishing between how phenomena appear in particular settings and the underlying relations that persist across them.`,
    95
  );
}

function buildImplicationsParagraph(topic, terms) {
  const t1 = terms[0] || "the topic";
  const t2 = terms[1] || "related forces";
  return expandSentence(
    `The practical implications of this argument extend to how educators, policymakers, and citizens deliberate about ${t1} and ${t2}. ` +
      `If synthesis rather than fragmentation guides inquiry, curricula and public forums can foreground tensions instead of false consensus. ` +
      `Institutional redesign—whether in law, media, or administration—must therefore be evaluated by whether it enables contested ideas to inform collective judgment without collapsing into relativism.`,
    95
  );
}

function buildHistoricalParagraph(topic, terms) {
  const term = pick(terms);
  return expandSentence(
    `Historically, debates over ${topicPhrase(topic)} have shifted as ${term} acquired new meanings across periods and geographies. ` +
      `Earlier generations often framed the issue in moral or theological vocabularies; contemporary discourse favors systemic and technical idioms. ` +
      `Tracing this genealogy does not dissolve present disagreements but clarifies why certain assumptions now feel inevitable. ` +
      `Historical consciousness thus becomes a tool of synthesis, linking past transformations to present stakes.`,
    95
  );
}

function buildComparativeParagraph(topic, terms) {
  const term = pick(terms);
  const region = pick(["European", "Global South", "transnational", "postcolonial", "comparative national"]);
  return expandSentence(
    `${capitalize(region)} perspectives on ${topicPhrase(topic)} challenge universal claims by showing how ${term} operates differently under varied institutional regimes. ` +
      `What counts as evidence, authority, or progress in one context may not translate cleanly to another. ` +
      `Rather than abandoning general theory, comparative work refines it by specifying scope conditions and mechanisms. ` +
      `This move strengthens the essay's central thesis: synthesis demands geographic and cultural breadth, not provincial abstraction.`,
    95
  );
}

function buildMethodParagraph(topic) {
  return expandSentence(
    `Methodologically, the essay adopts an interpretive yet critical stance toward ${topicPhrase(topic)}. ` +
      `It does not claim exhaustive empirical coverage; instead, it evaluates how concepts cohere, conflict, and illuminate one another. ` +
      `Such an approach aligns with humanistic and social-scientific traditions that treat understanding as iterative and revisable. ` +
      `Readers should therefore assess the argument by its explanatory power and internal consistency as much as by discrete factual claims.`,
    90
  );
}

function buildStakeholdersParagraph(topic, terms) {
  const term = pick(terms);
  return expandSentence(
    `Stakeholders affected by ${topicPhrase(topic)}—including communities, professionals, and advocacy groups—experience ${term} in materially different ways. ` +
      `Analytic frameworks that ignore lived consequence risk legitimizing harm while appearing neutral. ` +
      `Integrating stakeholder insight with structural analysis prevents both romantic particularism and detached abstraction. ` +
      `This integrative move exemplifies the deep synthesis the essay pursues throughout.`,
    90
  );
}

const SUPPLEMENT_PARAGRAPHS = [
  buildCounterargumentParagraph,
  buildImplicationsParagraph,
  buildHistoricalParagraph,
  buildComparativeParagraph,
  buildMethodParagraph,
  buildStakeholdersParagraph,
];

function padToTarget(paragraphs, topic, terms, target) {
  let total = wordCount(paragraphs.join(" "));
  const shuffledSupplements = shuffle(SUPPLEMENT_PARAGRAPHS);
  let i = 0;

  while (total < target * 0.95 && i < shuffledSupplements.length) {
    const extra = shuffledSupplements[i](topic, terms);
    paragraphs.splice(paragraphs.length - 1, 0, extra);
    total = wordCount(paragraphs.join(" "));
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

  const padded = padToTarget(paragraphs, topic, terms, target);
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
