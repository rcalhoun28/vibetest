const LENGTH_LABELS = {
  brief: "Brief (~400 words)",
  standard: "Standard (~750 words)",
  extended: "Extended (~1,200 words)",
  comprehensive: "Comprehensive (~2,000 words)",
};

const MIN_PROMPT_LENGTH = 15;
const API_KEY_STORAGE = "synthwrite_api_key";

const inputScreen = document.getElementById("input-screen");
const essayScreen = document.getElementById("essay-screen");
const promptEl = document.getElementById("prompt");
const lengthEl = document.getElementById("length");
const apiKeyEl = document.getElementById("api-key");
const inputError = document.getElementById("input-error");
const generateBtn = document.getElementById("generate-btn");
const essayOutput = document.getElementById("essay-output");
const essayTopic = document.getElementById("essay-topic");
const wordCountEl = document.getElementById("word-count");
const loadingEl = document.getElementById("loading");
const copyBtn = document.getElementById("copy-btn");
const newEssayBtn = document.getElementById("new-essay-btn");
const setupNotice = document.getElementById("setup-notice");

let essayText = "";
let serverOnline = false;

const savedKey = sessionStorage.getItem(API_KEY_STORAGE);
if (savedKey) apiKeyEl.value = savedKey;

apiKeyEl.addEventListener("change", () => {
  sessionStorage.setItem(API_KEY_STORAGE, apiKeyEl.value.trim());
});

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

function getApiKey() {
  return apiKeyEl.value.trim();
}

async function parseErrorResponse(response) {
  try {
    const data = await response.json();
    return data.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function consumeStream(reader) {
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;

      try {
        const parsed = JSON.parse(data);
        if (parsed.content) {
          essayText += parsed.content;
          renderEssay(true);
          updateWordCount();
          essayOutput.scrollTop = essayOutput.scrollHeight;
        }
      } catch {
        /* skip malformed chunk */
      }
    }
  }
}

async function generateEssay() {
  const prompt = promptEl.value.trim();
  const length = lengthEl.value;
  const apiKey = getApiKey();

  inputError.hidden = true;

  if (!serverOnline) {
    inputError.textContent =
      "Server not running. Open Terminal, cd to this project folder, run: node server.mjs — then visit http://localhost:3000";
    inputError.hidden = false;
    return;
  }

  if (!apiKey && !setupNotice.dataset.envReady) {
    inputError.textContent = "Please enter your OpenAI API key above.";
    inputError.hidden = false;
    return;
  }

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

  try {
    const response = await fetch("/api/essay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, length, apiKey: apiKey || undefined }),
    });

    if (!response.ok) {
      throw new Error(await parseErrorResponse(response));
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/event-stream")) {
      throw new Error("Unexpected response from server.");
    }

    setLoading(false);
    await consumeStream(response.body.getReader());

    if (!essayText.trim()) {
      throw new Error("No essay content received. Check your API key and try again.");
    }

    renderEssay(false);
    updateWordCount();
  } catch (err) {
    setLoading(false);
    showScreen(inputScreen);

    if (err.message === "Failed to fetch") {
      inputError.textContent =
        "Cannot reach server. Run node server.mjs in Terminal, then open http://localhost:3000";
    } else {
      inputError.textContent = err.message;
    }
    inputError.hidden = false;
  }
}

function truncate(str, max) {
  return str.length <= max ? str : `${str.slice(0, max)}…`;
}

generateBtn.addEventListener("click", generateEssay);

copyBtn.addEventListener("click", async () => {
  if (!essayText) return;
  await navigator.clipboard.writeText(essayText);
  copyBtn.classList.add("copied");
  setTimeout(() => copyBtn.classList.remove("copied"), 2000);
});

newEssayBtn.addEventListener("click", () => {
  showScreen(inputScreen);
});

async function checkSetup() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    serverOnline = true;
    setupNotice.dataset.envReady = data.ready ? "1" : "";

    if (data.ready) {
      setupNotice.hidden = true;
    } else {
      setupNotice.hidden = false;
      setupNotice.innerHTML =
        "<strong>Server is running.</strong> Add your OpenAI API key above, or put <code>OPENAI_API_KEY=sk-...</code> in a <code>.env</code> file.";
    }
  } catch {
    serverOnline = false;
    setupNotice.hidden = false;
    setupNotice.innerHTML =
      "<strong>Start the server:</strong> In Terminal, run <code>node server.mjs</code> from this folder, then open <code>http://localhost:3000</code> (do not open the HTML file directly).";
  }
}

checkSetup();
