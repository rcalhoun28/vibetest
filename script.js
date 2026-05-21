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
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
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

async function generateEssay() {
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

  try {
    const response = await fetch("/api/essay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, length }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate essay.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    setLoading(false);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.content) {
            essayText += parsed.content;
            essayOutput.innerHTML = formatEssay(essayText);
            updateWordCount();
            essayOutput.scrollTop = essayOutput.scrollHeight;
          }
        } catch {
          /* skip */
        }
      }
    }

    if (!essayText.trim()) {
      throw new Error("No essay content received.");
    }

    essayOutput.innerHTML = formatEssay(essayText);
    updateWordCount();
  } catch (err) {
    setLoading(false);
    showScreen(inputScreen);
    inputError.textContent = err.message;
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
