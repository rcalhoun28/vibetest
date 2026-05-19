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

const countryCodes = greetings.map((g) => g.country);

let index = 0;
let isSpinning = false;

const greetingEl = document.getElementById("greeting");
const languageEl = document.getElementById("language");
const countryMapEl = document.getElementById("country-map");
const countryOutlineEl = document.getElementById("country-outline");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomCountry(exclude) {
  let code;
  do {
    code = countryCodes[Math.floor(Math.random() * countryCodes.length)];
  } while (code === exclude && countryCodes.length > 1);
  return code;
}

function setCountry(code, name) {
  countryOutlineEl.src = `countries/${code}.svg`;
  countryOutlineEl.alt = name ? `${name} outline` : "";
}

function pulseCountry() {
  countryOutlineEl.classList.remove("tick");
  void countryOutlineEl.offsetWidth;
  countryOutlineEl.classList.add("tick");
}

async function spinCountryWheel(targetCountry, targetName) {
  const spinCount = 14 + Math.floor(Math.random() * 10);

  for (let i = 0; i < spinCount; i++) {
    const isFinal = i === spinCount - 1;
    const code = isFinal ? targetCountry : randomCountry(targetCountry);
    setCountry(code, isFinal ? targetName : "");
    pulseCountry();

    const progress = i / (spinCount - 1);
    const delay = 35 + progress * progress * 280;
    await sleep(delay);
  }
}

async function showNext() {
  if (isSpinning) return;
  isSpinning = true;

  const nextIndex = (index + 1) % greetings.length;
  const next = greetings[nextIndex];

  greetingEl.classList.add("fade");
  languageEl.classList.add("fade");
  countryMapEl.classList.add("spinning");

  await spinCountryWheel(next.country, next.countryName);

  index = nextIndex;
  setCountry(next.country, next.countryName);
  greetingEl.textContent = next.text;
  languageEl.textContent = next.language;

  countryMapEl.classList.remove("spinning");
  countryMapEl.classList.add("landed");
  greetingEl.classList.remove("fade");
  languageEl.classList.remove("fade");

  await sleep(400);
  countryMapEl.classList.remove("landed");
  isSpinning = false;
}

greetings.forEach((g) => {
  const img = new Image();
  img.src = `countries/${g.country}.svg`;
});

document.body.addEventListener("click", showNext);
