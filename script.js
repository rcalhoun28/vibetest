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

const greetingEl = document.getElementById("greeting");
const languageEl = document.getElementById("language");
const countryMapEl = document.getElementById("country-map");
const countryOutlineEl = document.getElementById("country-outline");

function showNext() {
  greetingEl.classList.add("fade");
  countryMapEl.classList.add("fade");

  setTimeout(() => {
    index = (index + 1) % greetings.length;
    const { text, language, country, countryName } = greetings[index];
    greetingEl.textContent = text;
    languageEl.textContent = language;
    countryOutlineEl.src = `countries/${country}.svg`;
    countryOutlineEl.alt = `${countryName} outline`;
    greetingEl.classList.remove("fade");
    countryMapEl.classList.remove("fade");
  }, 150);
}

document.body.addEventListener("click", showNext);
