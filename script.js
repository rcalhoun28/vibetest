const greetings = [
  { text: "Hello, World!", language: "English", country: "gb", countryName: "United Kingdom" },
  { text: "¡Hola, Mundo!", language: "Spanish", country: "es", countryName: "Spain" },
  { text: "Bonjour, le monde !", language: "French", country: "fr", countryName: "France" },
  { text: "Hallo, Welt!", language: "German", country: "de", countryName: "Germany" },
  { text: "Ciao, mondo!", language: "Italian", country: "it", countryName: "Italy" },
  { text: "Olá, Mundo!", language: "Portuguese", country: "pt", countryName: "Portugal" },
  { text: "こんにちは、世界！", language: "Japanese", country: "jp", countryName: "Japan" },
  { text: "안녕하세요, 세계!", language: "Korean", country: "kr", countryName: "South Korea" },
  { text: "你好，世界！", language: "Chinese", country: "cn", countryName: "China" },
  { text: "Привет, мир!", language: "Russian", country: "ru", countryName: "Russia" },
  { text: "مرحبا بالعالم!", language: "Arabic", country: "sa", countryName: "Saudi Arabia" },
  { text: "नमस्ते, दुनिया!", language: "Hindi", country: "in", countryName: "India" },
  { text: "Hej, världen!", language: "Swedish", country: "se", countryName: "Sweden" },
  { text: "Hallo, wereld!", language: "Dutch", country: "nl", countryName: "Netherlands" },
  { text: "Witaj, świecie!", language: "Polish", country: "pl", countryName: "Poland" },
  { text: "Merhaba, Dünya!", language: "Turkish", country: "tr", countryName: "Turkey" },
  { text: "Γειά σου, κόσμε!", language: "Greek", country: "gr", countryName: "Greece" },
  { text: "שלום, עולם!", language: "Hebrew", country: "il", countryName: "Israel" },
  { text: "สวัสดี, โลก!", language: "Thai", country: "th", countryName: "Thailand" },
  { text: "Xin chào, thế giới!", language: "Vietnamese", country: "vn", countryName: "Vietnam" },
];

let index = 0;
let isSpinning = false;

const greetingEl = document.getElementById("greeting");
const languageEl = document.getElementById("language");
const countryMapEl = document.getElementById("country-map");
const countryOutlineEl = document.getElementById("country-outline");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomIndex(exclude) {
  let i;
  do {
    i = Math.floor(Math.random() * greetings.length);
  } while (i === exclude && greetings.length > 1);
  return i;
}

function applyItem(item, isFinal) {
  greetingEl.textContent = item.text;
  languageEl.textContent = item.language;
  countryOutlineEl.src = `countries/${item.country}.svg`;
  countryOutlineEl.alt = isFinal ? `${item.countryName} outline` : "";
}

function pulseTick() {
  [countryOutlineEl, greetingEl, languageEl].forEach((el) => {
    el.classList.remove("tick");
    void el.offsetWidth;
    el.classList.add("tick");
  });
}

async function spinWheel(targetIndex) {
  const target = greetings[targetIndex];
  const spinCount = 14 + Math.floor(Math.random() * 10);

  for (let i = 0; i < spinCount; i++) {
    const isFinal = i === spinCount - 1;
    const item = isFinal ? target : greetings[randomIndex(targetIndex)];
    applyItem(item, isFinal);
    pulseTick();

    const progress = i / (spinCount - 1);
    const delay = 35 + progress * progress * 280;
    await sleep(delay);
  }
}

async function showNext() {
  if (isSpinning) return;
  isSpinning = true;

  const nextIndex = (index + 1) % greetings.length;

  countryMapEl.classList.add("spinning");

  await spinWheel(nextIndex);

  index = nextIndex;
  countryMapEl.classList.remove("spinning");
  countryMapEl.classList.add("landed");
  greetingEl.classList.add("landed");
  languageEl.classList.add("landed");

  await sleep(400);

  countryMapEl.classList.remove("landed");
  greetingEl.classList.remove("landed", "tick");
  languageEl.classList.remove("landed", "tick");
  countryOutlineEl.classList.remove("tick");
  isSpinning = false;
}

greetings.forEach((g) => {
  const img = new Image();
  img.src = `countries/${g.country}.svg`;
});

document.body.addEventListener("click", showNext);
