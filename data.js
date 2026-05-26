const COURSE_INTROS = {
  spanish: {
    id: 0,
    title: "Introduction to Spanish",
    intro:
      "Spanish is spoken by over 500 million people worldwide. This introductory lesson covers pronunciation basics, common sounds, and the learning path ahead—before you dive into vocabulary and quizzes.",
    objectives: [
      "Understand how lessons and quizzes work on LinguaLift",
      "Learn basic Spanish pronunciation tips",
      "Recognize essential courtesy words",
      "Prepare for your first graded quiz",
    ],
    grammar:
      "Spanish is phonetic: letters are pronounced consistently. Roll your R's lightly, and stress the correct syllable (often shown with an accent mark, e.g. café).",
    vocab: [
      { term: "Sí / No", meaning: "Yes / No" },
      { term: "Por favor", meaning: "Please" },
      { term: "Gracias", meaning: "Thank you" },
      { term: "Hola", meaning: "Hello" },
    ],
    phrases: [
      { term: "¿Cómo se dice…?", meaning: "How do you say…?" },
      { term: "No entiendo", meaning: "I don't understand" },
      { term: "Más despacio, por favor", meaning: "Slower, please" },
    ],
    quiz: [
      { type: "mcq", q: "How many people speak Spanish worldwide (approximately)?", options: ["50 million", "500 million", "5 million", "50 thousand"], a: "500 million" },
      { type: "mcq", q: "Spanish spelling is generally:", options: ["Random", "Phonetic (read as written)", "Identical to English", "Only symbols"], a: "Phonetic (read as written)" },
      { type: "mcq", q: "What does 'Gracias' mean?", options: ["Please", "Thank you", "Hello", "Goodbye"], a: "Thank you" },
      { type: "mcq", q: "'No entiendo' means:", options: ["I understand", "I don't understand", "Good morning", "See you later"], a: "I don't understand" },
      { type: "fill", q: "Please: por ___", a: "favor" },
      { type: "mcq", q: "What should you say if someone speaks too fast?", options: ["Más despacio, por favor", "Adiós", "Buenas noches", "Gracias"], a: "Más despacio, por favor" },
    ],
  },
  french: {
    id: 0,
    title: "Introduction to French",
    intro:
      "French is an official language in dozens of countries. Start here to learn how the course works, pick up first words, and build confidence before unit quizzes.",
    objectives: [
      "Learn how to navigate lessons step by step",
      "Master basic French sounds and greetings",
      "Use essential classroom phrases",
      "Pass your first introductory quiz",
    ],
    grammar:
      "French has nasal vowels (on, in, un) and silent final consonants. Liaison links words across boundaries in fluent speech.",
    vocab: [
      { term: "Oui / Non", meaning: "Yes / No" },
      { term: "Bonjour", meaning: "Hello" },
      { term: "Merci", meaning: "Thank you" },
      { term: "Pardon", meaning: "Sorry / Excuse me" },
    ],
    phrases: [
      { term: "Je ne comprends pas", meaning: "I don't understand" },
      { term: "Répétez, s'il vous plaît", meaning: "Repeat, please" },
    ],
    quiz: [
      { type: "mcq", q: "'Bonjour' is typically used:", options: ["Only at night", "As a greeting (hello)", "Only when leaving", "Only in writing"], a: "As a greeting (hello)" },
      { type: "mcq", q: "What does 'Merci' mean?", options: ["Please", "Thank you", "Goodbye", "Hello"], a: "Thank you" },
      { type: "fill", q: "Yes: ___", a: "oui" },
      { type: "mcq", q: "'Je ne comprends pas' means:", options: ["I understand", "I don't understand", "I am French", "Good night"], a: "I don't understand" },
      { type: "mcq", q: "French often links sounds between words. This is called:", options: ["Liaison", "Silent mode", "Capitalization", "Dialect"], a: "Liaison" },
      { type: "fill", q: "Sorry / Excuse me: ___", a: "pardon" },
    ],
  },
  german: {
    id: 0,
    title: "Introduction to German",
    intro:
      "German is the most widely spoken native language in Europe. This unit introduces pronunciation, study tips, and your first survival phrases before graded lessons.",
    objectives: [
      "Understand the lesson → quiz flow",
      "Learn German capitalization rules for nouns",
      "Recognize basic greetings and classroom phrases",
      "Complete the introductory quiz",
    ],
    grammar:
      "All German nouns are capitalized (der Mann = the man). Word order in statements often places the verb second.",
    vocab: [
      { term: "Ja / Nein", meaning: "Yes / No" },
      { term: "Hallo", meaning: "Hello" },
      { term: "Danke", meaning: "Thank you" },
      { term: "Bitte", meaning: "Please" },
    ],
    phrases: [
      { term: "Ich verstehe nicht", meaning: "I don't understand" },
      { term: "Können Sie das wiederholen?", meaning: "Can you repeat that?" },
    ],
    quiz: [
      { type: "mcq", q: "German nouns are always:", options: ["Lowercase", "Capitalized", "Written in English", "Silent"], a: "Capitalized" },
      { type: "mcq", q: "'Danke' means:", options: ["Please", "Thank you", "Goodbye", "Hello"], a: "Thank you" },
      { type: "fill", q: "Hello: ___", a: "hallo" },
      { type: "mcq", q: "'Ich verstehe nicht' means:", options: ["I understand", "I don't understand", "I am German", "Good night"], a: "I don't understand" },
      { type: "mcq", q: "In a basic German statement, the verb is often:", options: ["Last", "Second", "Omitted", "First always"], a: "Second" },
      { type: "fill", q: "Yes: ___", a: "ja" },
    ],
  },
  japanese: {
    id: 0,
    title: "Introduction to Japanese",
    intro:
      "Japanese uses three writing systems (hiragana, katakana, kanji). Begin with greetings, politeness levels, and how to study effectively before taking quizzes.",
    objectives: [
      "Learn the lesson structure before quizzes",
      "Understand polite vs. casual speech",
      "Master first greetings and classroom phrases",
      "Pass the intro quiz",
    ],
    grammar:
      "Politeness matters: です/ます forms are safe defaults. Bow slightly when greeting. Particles (は, を, が) mark grammatical roles.",
    vocab: [
      { term: "はい / いいえ", meaning: "Yes / No" },
      { term: "こんにちは", meaning: "Hello" },
      { term: "ありがとう", meaning: "Thank you" },
      { term: "すみません", meaning: "Excuse me / Sorry" },
    ],
    phrases: [
      { term: "わかりません", meaning: "I don't understand" },
      { term: "もう一度お願いします", meaning: "Once more, please" },
    ],
    quiz: [
      { type: "mcq", q: "Japanese has how many main writing systems?", options: ["One", "Three", "Ten", "None"], a: "Three" },
      { type: "mcq", q: "'ありがとう' means:", options: ["Goodbye", "Thank you", "Good morning", "Excuse me"], a: "Thank you" },
      { type: "mcq", q: "'わかりません' means:", options: ["I understand", "I don't understand", "Good evening", "Hello"], a: "I don't understand" },
      { type: "mcq", q: "Polite speech often ends with:", options: ["です/ます", "Only English", "No verbs", "Slang only"], a: "です/ます" },
      { type: "mcq", q: "'すみません' can mean:", options: ["Thank you", "Excuse me / Sorry", "Goodbye", "Good luck"], a: "Excuse me / Sorry" },
      { type: "mcq", q: "When greeting someone in Japan, people often:", options: ["Bow slightly", "Salute", "Shake hands only", "Wave only"], a: "Bow slightly" },
    ],
  },
  italian: {
    id: 0,
    title: "Introduction to Italian",
    intro:
      "Italian is known for clear vowels and expressive intonation. This first unit explains the course format and teaches essential words before you progress.",
    objectives: [
      "Navigate multi-step lessons before each quiz",
      "Pronounce Italian vowels clearly",
      "Use basic greetings and classroom phrases",
      "Score 70%+ on the intro quiz",
    ],
    grammar:
      "Italian vowels (a, e, i, o, u) are pronounced fully. Double consonants are held longer (nonno vs. nono).",
    vocab: [
      { term: "Sì / No", meaning: "Yes / No" },
      { term: "Ciao", meaning: "Hi / Bye (informal)" },
      { term: "Grazie", meaning: "Thank you" },
      { term: "Prego", meaning: "Please / You're welcome" },
    ],
    phrases: [
      { term: "Non capisco", meaning: "I don't understand" },
      { term: "Può ripetere?", meaning: "Can you repeat?" },
    ],
    quiz: [
      { type: "mcq", q: "Italian vowels are typically:", options: ["Silent", "Pronounced clearly", "Dropped", "Same as English always"], a: "Pronounced clearly" },
      { type: "mcq", q: "'Grazie' means:", options: ["Please", "Thank you", "Goodbye", "Hello"], a: "Thank you" },
      { type: "fill", q: "I don't understand: Non ___", a: "capisco" },
      { type: "mcq", q: "'Ciao' is used:", options: ["Only formally", "Informally (hi/bye)", "Only in writing", "Only at night"], a: "Informally (hi/bye)" },
      { type: "mcq", q: "Double consonants in Italian are:", options: ["Skipped", "Held longer", "Silent", "Always wrong"], a: "Held longer" },
      { type: "fill", q: "Thank you: ___", a: "grazie" },
    ],
  },
};

const COURSES = {
  spanish: {
    name: "Spanish",
    flag: "🇪🇸",
    native: "Español",
    lessons: [
      {
        id: 1,
        title: "Greetings & Introductions",
        intro:
          "Before the quiz, you'll learn how to greet people, introduce yourself, and use polite words in everyday Spanish conversations.",
        objectives: [
          "Greet people at different times of day",
          "Say please, thank you, and goodbye",
          "Introduce yourself and ask someone's name",
        ],
        grammar: "Spanish greetings vary by time of day. Use tú (informal) with friends and usted (formal) with strangers or elders.",
        vocab: [
          { term: "Hola", meaning: "Hello" },
          { term: "Buenos días", meaning: "Good morning" },
          { term: "Buenas tardes", meaning: "Good afternoon" },
          { term: "Buenas noches", meaning: "Good evening / night" },
          { term: "Adiós", meaning: "Goodbye" },
          { term: "Por favor", meaning: "Please" },
          { term: "Gracias", meaning: "Thank you" },
        ],
        phrases: [
          { term: "¿Cómo te llamas?", meaning: "What is your name? (informal)" },
          { term: "Me llamo…", meaning: "My name is…" },
          { term: "Mucho gusto", meaning: "Nice to meet you" },
        ],
        quiz: [
          { type: "mcq", q: "How do you say 'Hello' in Spanish?", options: ["Hola", "Adiós", "Gracias", "Por favor"], a: "Hola" },
          { type: "mcq", q: "What does 'Buenos días' mean?", options: ["Good night", "Good morning", "Goodbye", "Thank you"], a: "Good morning" },
          { type: "mcq", q: "Which phrase means 'Nice to meet you'?", options: ["Mucho gusto", "Buenas noches", "Por favor", "¿Cómo te llamas?"], a: "Mucho gusto" },
          { type: "fill", q: "Thank you: ___", a: "gracias", hint: "One word, 6 letters" },
          { type: "mcq", q: "What is the informal way to ask someone's name?", options: ["¿Cómo te llamas?", "Buenos días", "Adiós", "Gracias"], a: "¿Cómo te llamas?" },
          { type: "fill", q: "Goodbye: ___", a: "adiós" },
          { type: "mcq", q: "'Buenas tardes' is used in the:", options: ["Morning", "Afternoon", "Only at night", "Only when leaving"], a: "Afternoon" },
          { type: "mcq", q: "What does 'Por favor' mean?", options: ["Please", "Thank you", "Hello", "Good night"], a: "Please" },
        ],
      },
      {
        id: 2,
        title: "Numbers & Basics",
        intro: "Numbers help you shop, tell time, and understand prices. Study these digits before answering quiz questions.",
        objectives: [
          "Count from one to fifteen in Spanish",
          "Ask how much something costs",
          "Use numbers in simple phrases",
        ],
        grammar: "Numbers 1–15 are essential for shopping and schedules. Uno changes to un before masculine nouns (un libro).",
        vocab: [
          { term: "uno", meaning: "one" },
          { term: "dos", meaning: "two" },
          { term: "tres", meaning: "three" },
          { term: "cuatro", meaning: "four" },
          { term: "cinco", meaning: "five" },
          { term: "diez", meaning: "ten" },
          { term: "quince", meaning: "fifteen" },
        ],
        phrases: [
          { term: "¿Cuánto cuesta?", meaning: "How much does it cost?" },
          { term: "Son cinco euros", meaning: "It's five euros" },
        ],
        quiz: [
          { type: "mcq", q: "What number is 'tres'?", options: ["two", "three", "four", "ten"], a: "three" },
          { type: "mcq", q: "How do you say 'five' in Spanish?", options: ["cuatro", "cinco", "diez", "dos"], a: "cinco" },
          { type: "fill", q: "Five in Spanish: ___", a: "cinco" },
          { type: "mcq", q: "What does '¿Cuánto cuesta?' mean?", options: ["Where is it?", "How much does it cost?", "What time?", "How many?"], a: "How much does it cost?" },
          { type: "fill", q: "Ten: ___", a: "diez" },
          { type: "mcq", q: "Which word means 'four'?", options: ["dos", "tres", "cuatro", "cinco"], a: "cuatro" },
          { type: "mcq", q: "'Son cinco euros' means:", options: ["It's five euros", "Five o'clock", "Five people", "Goodbye"], a: "It's five euros" },
          { type: "mcq", q: "What is 'quince'?", options: ["five", "ten", "fifteen", "one"], a: "fifteen" },
        ],
      },
      {
        id: 3,
        title: "Everyday Verbs",
        intro: "Verbs let you describe actions. This lesson covers common verbs and simple sentences before your quiz.",
        objectives: [
          "Recognize five essential verbs",
          "Understand basic -ar verb patterns",
          "Read simple subject + verb sentences",
        ],
        grammar: "Regular -ar verbs: remove -ar and add -o, -as, -a… Example: hablar → hablo (I speak).",
        vocab: [
          { term: "hablar", meaning: "to speak" },
          { term: "estudiar", meaning: "to study" },
          { term: "trabajar", meaning: "to work" },
          { term: "comer", meaning: "to eat" },
          { term: "vivir", meaning: "to live" },
        ],
        phrases: [
          { term: "Yo hablo español", meaning: "I speak Spanish" },
          { term: "Ella estudia mucho", meaning: "She studies a lot" },
        ],
        quiz: [
          { type: "mcq", q: "What does the verb 'hablar' mean?", options: ["to eat", "to speak", "to live", "to work"], a: "to speak" },
          { type: "mcq", q: "Which verb means 'to eat'?", options: ["vivir", "comer", "hablar", "estudiar"], a: "comer" },
          { type: "fill", q: "to eat: ___", a: "comer" },
          { type: "mcq", q: "What does 'Yo hablo español' mean?", options: ["I eat Spanish", "I speak Spanish", "I study Spanish", "I live in Spain"], a: "I speak Spanish" },
          { type: "fill", q: "to live: ___", a: "vivir" },
          { type: "mcq", q: "What does 'trabajar' mean?", options: ["to work", "to walk", "to wait", "to travel"], a: "to work" },
          { type: "mcq", q: "'Ella estudia mucho' means:", options: ["She works a lot", "She studies a lot", "She eats a lot", "She lives far"], a: "She studies a lot" },
          { type: "mcq", q: "Which verb means 'to study'?", options: ["estudiar", "comer", "vivir", "trabajar"], a: "estudiar" },
        ],
      },
    ],
  },
  french: {
    name: "French",
    flag: "🇫🇷",
    native: "Français",
    lessons: [
      {
        id: 1,
        title: "Greetings & Politeness",
        grammar: "French uses formal (vous) and informal (tu) address. Always say Bonjour when entering a shop.",
        vocab: [
          { term: "Bonjour", meaning: "Hello / Good day" },
          { term: "Bonsoir", meaning: "Good evening" },
          { term: "Salut", meaning: "Hi (informal)" },
          { term: "Au revoir", meaning: "Goodbye" },
          { term: "Merci", meaning: "Thank you" },
          { term: "S'il vous plaît", meaning: "Please (formal)" },
        ],
        phrases: [
          { term: "Comment allez-vous?", meaning: "How are you? (formal)" },
          { term: "Je m'appelle…", meaning: "My name is…" },
          { term: "Enchanté(e)", meaning: "Pleased to meet you" },
        ],
        quiz: [
          { type: "mcq", q: "'Bonjour' is used for:", options: ["Good night only", "Hello / Good day", "Goodbye", "Thank you"], a: "Hello / Good day" },
          { type: "fill", q: "Thank you: ___", a: "merci" },
          { type: "mcq", q: "'Enchanté' means:", options: ["Good luck", "Pleased to meet you", "Excuse me", "See you soon"], a: "Pleased to meet you" },
          { type: "fill", q: "Goodbye: ___ revoir", a: "au" },
          { type: "mcq", q: "Informal 'hi' is:", options: ["Bonsoir", "Salut", "Merci", "Bonjour"], a: "Salut" },
        ],
      },
      {
        id: 2,
        title: "Numbers & Shopping",
        grammar: "French numbers 1–10: un, deux, trois… Sixty is soixante; seventy is soixante-dix.",
        vocab: [
          { term: "un / une", meaning: "one" },
          { term: "deux", meaning: "two" },
          { term: "trois", meaning: "three" },
          { term: "cinq", meaning: "five" },
          { term: "dix", meaning: "ten" },
        ],
        phrases: [
          { term: "C'est combien?", meaning: "How much is it?" },
          { term: "Je voudrais…", meaning: "I would like…" },
        ],
        quiz: [
          { type: "mcq", q: "'trois' is:", options: ["two", "three", "ten", "five"], a: "three" },
          { type: "fill", q: "Ten: ___", a: "dix" },
          { type: "mcq", q: "'C'est combien?' means:", options: ["What time?", "How much?", "Where?", "Who?"], a: "How much?" },
          { type: "fill", q: "Five: ___", a: "cinq" },
          { type: "mcq", q: "'Je voudrais' means:", options: ["I have", "I would like", "I can", "I am"], a: "I would like" },
        ],
      },
      {
        id: 3,
        title: "Common Verbs",
        grammar: "être (to be) and avoir (to have) are irregular. Je suis = I am; J'ai = I have.",
        vocab: [
          { term: "être", meaning: "to be" },
          { term: "avoir", meaning: "to have" },
          { term: "aller", meaning: "to go" },
          { term: "faire", meaning: "to do / make" },
          { term: "parler", meaning: "to speak" },
        ],
        phrases: [
          { term: "Je suis étudiant", meaning: "I am a student" },
          { term: "J'ai faim", meaning: "I am hungry (lit. I have hunger)" },
        ],
        quiz: [
          { type: "mcq", q: "'être' means:", options: ["to have", "to be", "to go", "to speak"], a: "to be" },
          { type: "fill", q: "to have: ___", a: "avoir" },
          { type: "mcq", q: "'J'ai faim' means:", options: ["I am tired", "I am hungry", "I am happy", "I am late"], a: "I am hungry" },
          { type: "fill", q: "to go: ___", a: "aller" },
          { type: "mcq", q: "'Je suis étudiant' means:", options: ["I have a student", "I am a student", "I see a student", "I want to study"], a: "I am a student" },
        ],
      },
    ],
  },
  german: {
    name: "German",
    flag: "🇩🇪",
    native: "Deutsch",
    lessons: [
      {
        id: 1,
        title: "Greetings & Basics",
        grammar: "German capitalizes all nouns. Guten Tag is neutral-formal; Hallo is casual.",
        vocab: [
          { term: "Hallo", meaning: "Hello" },
          { term: "Guten Morgen", meaning: "Good morning" },
          { term: "Guten Tag", meaning: "Good day" },
          { term: "Gute Nacht", meaning: "Good night" },
          { term: "Danke", meaning: "Thank you" },
          { term: "Bitte", meaning: "Please / You're welcome" },
        ],
        phrases: [
          { term: "Wie heißen Sie?", meaning: "What is your name? (formal)" },
          { term: "Ich heiße…", meaning: "My name is…" },
          { term: "Freut mich", meaning: "Nice to meet you" },
        ],
        quiz: [
          { type: "mcq", q: "'Guten Morgen' means:", options: ["Good night", "Good morning", "Goodbye", "Hello"], a: "Good morning" },
          { type: "fill", q: "Thank you: ___", a: "danke" },
          { type: "mcq", q: "'Bitte' can mean:", options: ["Only goodbye", "Please / You're welcome", "Good night", "Excuse me only"], a: "Please / You're welcome" },
          { type: "fill", q: "My name is: Ich ___", a: "heiße" },
          { type: "mcq", q: "'Freut mich' means:", options: ["I'm sorry", "Nice to meet you", "See you", "Good luck"], a: "Nice to meet you" },
        ],
      },
      {
        id: 2,
        title: "Numbers & Time",
        grammar: "German numbers: eins, zwei, drei… Uhr means o'clock (Es ist drei Uhr).",
        vocab: [
          { term: "eins", meaning: "one" },
          { term: "zwei", meaning: "two" },
          { term: "drei", meaning: "three" },
          { term: "fünf", meaning: "five" },
          { term: "zehn", meaning: "ten" },
        ],
        phrases: [
          { term: "Wie viel kostet das?", meaning: "How much does that cost?" },
          { term: "Wie spät ist es?", meaning: "What time is it?" },
        ],
        quiz: [
          { type: "mcq", q: "'drei' is:", options: ["two", "three", "five", "ten"], a: "three" },
          { type: "fill", q: "Ten: ___", a: "zehn" },
          { type: "mcq", q: "'Wie spät ist es?' asks:", options: ["Where?", "What time?", "Why?", "Who?"], a: "What time?" },
          { type: "fill", q: "Five: ___", a: "fünf" },
          { type: "mcq", q: "'zwei' means:", options: ["one", "two", "three", "ten"], a: "two" },
        ],
      },
    ],
  },
  japanese: {
    name: "Japanese",
    flag: "🇯🇵",
    native: "日本語",
    lessons: [
      {
        id: 1,
        title: "Greetings & Courtesy",
        grammar: "Japanese has polite (です/ます) and casual forms. Bowing accompanies greetings. は is pronounced 'wa' as a particle.",
        vocab: [
          { term: "こんにちは", meaning: "Hello (afternoon)" },
          { term: "おはよう", meaning: "Good morning" },
          { term: "こんばんは", meaning: "Good evening" },
          { term: "さようなら", meaning: "Goodbye" },
          { term: "ありがとう", meaning: "Thank you" },
          { term: "すみません", meaning: "Excuse me / Sorry" },
        ],
        phrases: [
          { term: "はじめまして", meaning: "Nice to meet you" },
          { term: "お元気ですか", meaning: "How are you? (polite)" },
          { term: "よろしくお願いします", meaning: "Please treat me well (common intro)" },
        ],
        quiz: [
          { type: "mcq", q: "'ありがとう' means:", options: ["Goodbye", "Thank you", "Hello", "Excuse me"], a: "Thank you" },
          { type: "mcq", q: "'はじめまして' is used when:", options: ["Leaving", "Meeting someone new", "Eating", "Sleeping"], a: "Meeting someone new" },
          { type: "mcq", q: "'こんばんは' means:", options: ["Good morning", "Good evening", "Good night only", "Hello (morning)"], a: "Good evening" },
          { type: "mcq", q: "'すみません' can mean:", options: ["Thank you", "Excuse me / Sorry", "Goodbye", "Good luck"], a: "Excuse me / Sorry" },
          { type: "mcq", q: "Polite 'thank you very much' is often:", options: ["さようなら", "ありがとうございます", "おはよう", "こんにちは"], a: "ありがとうございます" },
        ],
      },
      {
        id: 2,
        title: "Numbers & Counters",
        grammar: "Japanese uses counters after numbers (一つ hitotsu = one thing). Native numbers 1–5: 一, 二, 三, 四, 五.",
        vocab: [
          { term: "一 (いち)", meaning: "one" },
          { term: "二 (に)", meaning: "two" },
          { term: "三 (さん)", meaning: "three" },
          { term: "四 (よん/し)", meaning: "four" },
          { term: "五 (ご)", meaning: "five" },
          { term: "十 (じゅう)", meaning: "ten" },
        ],
        phrases: [
          { term: "いくらですか", meaning: "How much is it?" },
          { term: "〜をください", meaning: "Please give me…" },
        ],
        quiz: [
          { type: "mcq", q: "'三' (さん) is:", options: ["two", "three", "five", "ten"], a: "three" },
          { type: "mcq", q: "'いくらですか' means:", options: ["Where?", "How much?", "What?", "When?"], a: "How much?" },
          { type: "mcq", q: "'五' is:", options: ["four", "five", "six", "ten"], a: "five" },
          { type: "mcq", q: "'十' (じゅう) is:", options: ["five", "seven", "ten", "one"], a: "ten" },
          { type: "mcq", q: "'二' is:", options: ["one", "two", "three", "four"], a: "two" },
        ],
      },
    ],
  },
  italian: {
    name: "Italian",
    flag: "🇮🇹",
    native: "Italiano",
    lessons: [
      {
        id: 1,
        title: "Greetings & Introductions",
        grammar: "Italian vowels are clear and open. Lei is formal 'you'; tu is informal.",
        vocab: [
          { term: "Ciao", meaning: "Hi / Bye (informal)" },
          { term: "Buongiorno", meaning: "Good morning / day" },
          { term: "Buonasera", meaning: "Good evening" },
          { term: "Arrivederci", meaning: "Goodbye" },
          { term: "Grazie", meaning: "Thank you" },
          { term: "Prego", meaning: "You're welcome / Please" },
        ],
        phrases: [
          { term: "Come ti chiami?", meaning: "What is your name?" },
          { term: "Mi chiamo…", meaning: "My name is…" },
          { term: "Piacere", meaning: "Pleased to meet you" },
        ],
        quiz: [
          { type: "mcq", q: "'Buongiorno' means:", options: ["Good night", "Good morning/day", "Goodbye", "Thanks"], a: "Good morning/day" },
          { type: "fill", q: "Thank you: ___", a: "grazie" },
          { type: "mcq", q: "'Piacere' means:", options: ["Please", "Pleased to meet you", "Excuse me", "Good luck"], a: "Pleased to meet you" },
          { type: "fill", q: "Goodbye (formal): ___", a: "arrivederci" },
          { type: "mcq", q: "'Prego' often means:", options: ["Goodbye", "You're welcome", "Good night", "Hello"], a: "You're welcome" },
        ],
      },
      {
        id: 2,
        title: "Essential Verbs",
        grammar: "Verbs end in -are, -ere, -ire. Parlare (to speak): parlo, parli, parla…",
        vocab: [
          { term: "essere", meaning: "to be" },
          { term: "avere", meaning: "to have" },
          { term: "parlare", meaning: "to speak" },
          { term: "mangiare", meaning: "to eat" },
          { term: "andare", meaning: "to go" },
        ],
        phrases: [
          { term: "Sono di Roma", meaning: "I'm from Rome" },
          { term: "Ho fame", meaning: "I'm hungry" },
        ],
        quiz: [
          { type: "mcq", q: "'essere' means:", options: ["to have", "to be", "to go", "to eat"], a: "to be" },
          { type: "fill", q: "to eat: ___", a: "mangiare" },
          { type: "mcq", q: "'Ho fame' means:", options: ["I am tired", "I am hungry", "I am happy", "I am here"], a: "I am hungry" },
          { type: "fill", q: "to speak: ___", a: "parlare" },
          { type: "mcq", q: "'andare' means:", options: ["to go", "to stay", "to speak", "to have"], a: "to go" },
        ],
      },
    ],
  },
};

function defaultLessonMeta(lesson, courseName) {
  if (!lesson.intro) {
    lesson.intro = `In this lesson on ${courseName}, you will study "${lesson.title}" through vocabulary, phrases, and grammar—then prove your knowledge in a quiz.`;
  }
  if (!lesson.objectives) {
    lesson.objectives = [
      `Learn key words for ${lesson.title}`,
      "Practice useful phrases",
      "Apply the grammar tip",
      "Pass the lesson quiz with 70% or higher",
    ];
  }
}

Object.keys(COURSES).forEach((lang) => {
  const course = COURSES[lang];
  const intro = COURSE_INTROS[lang];
  if (intro) {
    defaultLessonMeta(intro, course.name);
    course.lessons = [intro, ...course.lessons.filter((l) => l.id !== 0)];
  }
  course.lessons.forEach((lesson) => defaultLessonMeta(lesson, course.name));
});
