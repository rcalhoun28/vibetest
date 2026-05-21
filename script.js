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

function makeTopicExtensions(topic, terms) {
  const tp = topicPhrase(topic);
  const list = terms.length ? terms : [topic];
  const extensions = [];

  list.forEach((term, i) => {
    const other = list[(i + 1) % list.length];
    extensions.push(
      ` In the context of ${tp}, ${term} shapes how participants interpret ${other} and respond to institutional pressures.`,
      ` Analysts of ${tp} increasingly treat ${term} not as a footnote but as a variable that reorganizes the entire problem space.`,
      ` Concrete disputes over ${term} within ${tp} reveal where theory and practice diverge, and why synthesis must address both.`,
    );
  });

  extensions.push(
    ` Any serious treatment of ${tp} must therefore connect abstract claims to the mechanisms through which they materialize in policy and daily life.`,
    ` The foregoing discussion of ${tp} suggests that single-discipline explanations routinely under-specify the relations they claim to describe.`,
    ` Readers evaluating ${tp} should weigh not only descriptive accuracy but whether an account can absorb counterevidence without collapsing.`,
    ` What distinguishes a synthetic approach to ${tp} is its capacity to relate competing explanations instead of ranking them prematurely.`,
  );

  return shuffle(extensions);
}

function expandSentence(base, targetWords, topic, terms, used) {
  let text = base;
  const pool = makeTopicExtensions(topic, terms).filter((s) => !used.has(s));
  let i = 0;
  while (wordCount(text) < targetWords && i < pool.length) {
    used.add(pool[i]);
    text += pool[i];
    i++;
  }
  return text;
}

function bodyParagraph(topic, terms, lens, index, used, targetWords) {
  const term = terms[index % terms.length] || topic;
  const term2 = terms[(index + 1) % terms.length] || term;
  const term3 = terms[(index + 2) % terms.length] || term2;
  const otherLens = pick(LENSES.filter((l) => l !== lens));
  const syn = SYNTHESIS[index % SYNTHESIS.length];
  const trans = TRANSITIONS[index % TRANSITIONS.length];

  const variants = [
    `${trans}, an examination of ${lens} clarifies how ${term} mediates our understanding of ${topicPhrase(topic)}. ${syn} ${otherLens}, material and symbolic dimensions co-produce outcomes that neither alone can explain. Here ${term2} and ${term3} are not peripheral details but coordinates for interpreting why ${topic} remains contested.`,
    `From the vantage of ${lens}, ${term} emerges as structurally constitutive of debates surrounding ${topic}. Rather than treating ${term2} as background context, this section positions it as an active variable within ${topicPhrase(topic)}. ${syn} dominant narratives about ${term3}, multi-causal explanation displaces accounts that privilege a single lever of change.`,
    `${capitalize(lens)} reframes disputes about ${topic}: ${term} reconfigures what counts as evidence and what counts as consequence. ${trans}, linking ${term2} to wider patterns in ${topicPhrase(topic)} avoids anecdotal particularism. The dispute over ${term3} exemplifies why reductionist models fail for this topic.`,
    `If ${lens} is taken seriously, ${term} cannot be bracketed when assessing ${topicPhrase(topic)}. ${syn} inquiries into ${otherLens}, the analysis shows reciprocal determination between structure and practice as they bear on ${term2}. For ${topic}, making ${term3} visible is part of the synthetic task this essay undertakes.`,
    `Section ${index + 1} foregrounds ${lens} as a lens on ${topicPhrase(topic)}, arguing that ${term} alters how ${term2} is classified, measured, and acted upon. Without integrating ${term3}, reform efforts addressing ${topic} repeat familiar failures. ${trans}, the section links micro-level choices to macro-level patterns.`,
  ];

  return expandSentence(variants[index % variants.length], targetWords, topic, terms, used);
}

function buildConclusion(topic, terms, used) {
  const t = terms[0] || topic;
  const t2 = terms[1] || t;
  const variants = [
    `In conclusion, ${topicPhrase(topic)} rewards interdisciplinary synthesis rather than narrow specialization. Perspectives on ${terms.slice(0, 3).join(", ") || t} converge on a critical yet constructive reading of ${topic}. The analysis of ${t2} in particular shows why future inquiry must remain comparative, historical, and attentive to power.`,
    `To conclude, this essay has argued that ${topicPhrase(topic)} is best approached through layered analysis rather than single-factor explanation. Themes of ${terms.slice(0, 2).join(" and ") || t} thread through each section on ${topic}, demonstrating deep synthesis rather than summary. The task ahead is to test these claims against new cases while refining how ${t2} is theorized.`,
    `Ultimately, understanding ${topicPhrase(topic)} requires holding ${t} and ${t2} in deliberate tension. The preceding sections mapped that tension within ${topic} without resolving it prematurely. Such restraint strengthens the argument: it invites continued scholarship and more informed public deliberation about ${topic}.`,
  ];
  return expandSentence(pick(variants), 100, topic, terms, used);
}

function buildIntroduction(topic, thesis, used) {
  const lead = termsFromTopic(topic);
  return expandSentence(
    `${capitalize(topicPhrase(topic))} occupies a central place in contemporary scholarship, yet accounts of ${topic} often talk past one another. ` +
      `Some emphasize ${lead[0] || "structure"}; others foreground ${lead[1] || "agency"} or ${lead[2] || "discourse"}. ` +
      `What unites these divergent approaches is a shared recognition that ${topic} resists easy resolution. ` +
      `${thesis}`,
    115,
    topic,
    lead,
    used
  );
}

function termsFromTopic(topic) {
  return extractTerms(topic).length ? extractTerms(topic) : topic.split(/\s+/).filter((w) => w.length > 3);
}

function buildSupplement(topic, terms, sectionIndex, used) {
  const t0 = terms[sectionIndex % terms.length] || topic;
  const t1 = terms[(sectionIndex + 1) % terms.length] || t0;
  const t2 = terms[(sectionIndex + 2) % terms.length] || t1;
  const tp = topicPhrase(topic);

  const sections = [
    `A substantive objection to prevailing views of ${tp} holds that they exaggerate ${t0} at the expense of lived experience with ${topic}. Advocates of this critique insist that communities encounter ${t1} in ways theory often misses. Engaging ${topic} fairly requires answering whether ${t2} still matters once local variation is taken seriously.`,
    `The practical implications for ${topic} follow directly: decisions about ${t0} and ${t1} shape who benefits and who bears risk within ${tp}. Policymakers addressing ${topic} cannot treat ${t2} as merely technical when it encodes values and distributes authority.`,
    `Historically, ${tp} has been framed through shifting vocabularies of ${t0}, ${t1}, and moral obligation. Earlier eras approached ${topic} differently than contemporary analysts, yet persistent patterns linking ${t2} to institutional power remain. Genealogical awareness clarifies what is novel about present conflicts over ${topic}.`,
    `Comparative inquiry into ${topic} shows that ${t0} under ${t1} does not operate uniformly across regions. ${capitalize(tp)} appears differently when ${t2} is embedded in distinct legal, economic, and cultural systems. Comparative breadth prevents claims about ${topic} from collapsing into parochial generalization.`,
    `Methodologically, this essay interprets ${topic} by relating concepts rather than cataloguing facts alone. The focus on ${t0}, ${t1}, and ${t2} within ${tp} is deliberate: it tests whether an integrative framework improves explanatory clarity for ${topic} specifically.`,
    `Communities and professionals engaged with ${topic} experience ${t0} and ${t1} in uneven ways. Centering ${t2} within ${tp} makes visible harms and possibilities that detached models overlook. Synthetic analysis of ${topic} therefore carries normative as well as descriptive weight.`,
  ];

  const base = sections[sectionIndex % sections.length];
  return expandSentence(base, 110, topic, terms, used);
}

const BODY_CONFIG = {
  brief: { count: 3, words: 95 },
  standard: { count: 4, words: 120 },
  extended: { count: 6, words: 135 },
  comprehensive: { count: 10, words: 150 },
};

const SUPPLEMENT_COUNT = {
  brief: 0,
  standard: 0,
  extended: 2,
  comprehensive: 4,
};

function generateEssay(prompt, lengthKey = "standard") {
  const topic = cleanTopic(prompt);
  let terms = extractTerms(prompt);
  if (!terms.length) {
    terms = topic.split(/\s+/).filter((w) => w.length > 3).map((w) => w.toLowerCase());
  }
  if (!terms.length) terms = [topic];

  const target = LENGTH_TARGETS[lengthKey] || LENGTH_TARGETS.standard;
  const used = new Set();
  const thesis = buildThesis(topic, terms);
  const config = BODY_CONFIG[lengthKey] || BODY_CONFIG.standard;

  const lenses = shuffle([...LENSES]);
  const paragraphs = [buildIntroduction(topic, thesis, used)];

  for (let i = 0; i < config.count; i++) {
    paragraphs.push(
      bodyParagraph(topic, terms, lenses[i % lenses.length], i, used, config.words)
    );
  }

  const supplementTotal = SUPPLEMENT_COUNT[lengthKey] || 0;
  const supplementOrder = shuffle([0, 1, 2, 3, 4, 5]);
  for (let s = 0; s < supplementTotal; s++) {
    paragraphs.push(buildSupplement(topic, terms, supplementOrder[s], used));
  }

  let extraBodyIndex = config.count;
  while (wordCount(paragraphs.join(" ")) < target * 0.92 && extraBodyIndex < config.count + 4) {
    paragraphs.push(
      bodyParagraph(
        topic,
        terms,
        lenses[extraBodyIndex % lenses.length],
        extraBodyIndex,
        used,
        config.words
      )
    );
    extraBodyIndex++;
  }

  paragraphs.push(buildConclusion(topic, terms, used));
  return paragraphs.join("\n\n");
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
