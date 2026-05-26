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
      { type: "mcq", q: "You're in a Spanish class and don't follow what the teacher said. You say:", options: ["Más despacio, por favor", "Gracias", "Hola", "Sí"], a: "Más despacio, por favor" },
      { type: "fill", q: "Complete: ___ favor (please)", a: "por" },
      { type: "mcq", q: "Which phrase would you use to ask how to say something in Spanish?", options: ["No entiendo", "¿Cómo se dice…?", "Gracias", "Más despacio"], a: "¿Cómo se dice…?" },
      { type: "fill", q: "I don't understand: No ___", a: "entiendo" },
      { type: "mcq", q: "The accent mark in 'café' tells you to:", options: ["Whisper the word", "Stress the last syllable", "Skip the letter", "Pronounce it silently"], a: "Stress the last syllable" },
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
      { type: "mcq", q: "You walk into a bakery in Paris. The first thing you should say is:", options: ["Merci", "Bonjour", "Pardon", "Non"], a: "Bonjour" },
      { type: "mcq", q: "What does 'Merci' mean?", options: ["Please", "Thank you", "Goodbye", "Hello"], a: "Thank you" },
      { type: "fill", q: "Yes: ___", a: "oui" },
      { type: "mcq", q: "Your French teacher speaks too quickly. You say:", options: ["Bonjour", "Merci", "Répétez, s'il vous plaît", "Oui"], a: "Répétez, s'il vous plaît" },
      { type: "mcq", q: "In French, the final consonant of a word is usually:", options: ["Doubled", "Silent", "Shouted", "Replaced with a vowel"], a: "Silent" },
      { type: "fill", q: "I don't understand: Je ne ___ pas", a: "comprends" },
      { type: "mcq", q: "What is 'liaison' in French?", options: ["A type of bread", "Linking sounds between words", "A formal greeting", "A writing rule"], a: "Linking sounds between words" },
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
      { type: "mcq", q: "Which is written correctly in German?", options: ["der mann", "Der Mann", "DER MANN", "der Mann"], a: "Der Mann" },
      { type: "mcq", q: "Someone helps you carry your bags. You say:", options: ["Bitte", "Nein", "Danke", "Hallo"], a: "Danke" },
      { type: "fill", q: "Hello: ___", a: "hallo" },
      { type: "mcq", q: "You're lost in Berlin and don't understand directions. You say:", options: ["Danke", "Ich verstehe nicht", "Ja", "Hallo"], a: "Ich verstehe nicht" },
      { type: "mcq", q: "In a basic German sentence like 'Ich bin müde' (I am tired), the verb is in position:", options: ["First", "Second", "Last", "Third"], a: "Second" },
      { type: "fill", q: "Yes: ___", a: "ja" },
      { type: "mcq", q: "You want someone to repeat what they said. You ask:", options: ["Ich verstehe nicht", "Können Sie das wiederholen?", "Danke", "Ja"], a: "Können Sie das wiederholen?" },
      { type: "fill", q: "Please: ___", a: "bitte" },
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
      { type: "mcq", q: "Which three writing systems does Japanese use?", options: ["Hiragana, Katakana, Kanji", "Cyrillic, Latin, Greek", "Hangul, Hanja, Latin", "Arabic, Hebrew, Latin"], a: "Hiragana, Katakana, Kanji" },
      { type: "mcq", q: "You accidentally bump into someone on the train. You say:", options: ["ありがとう", "すみません", "こんにちは", "いいえ"], a: "すみません" },
      { type: "mcq", q: "Which ending indicates polite speech?", options: ["です/ます", "だ/する", "ね/よ", "の/か"], a: "です/ます" },
      { type: "mcq", q: "Your teacher explains something and you're completely lost. You say:", options: ["はい", "わかりません", "ありがとう", "こんにちは"], a: "わかりません" },
      { type: "mcq", q: "When meeting someone for the first time in Japan, it is polite to:", options: ["Hug them", "Bow slightly", "Give a thumbs up", "Wink"], a: "Bow slightly" },
      { type: "mcq", q: "The particle は (wa) is used to:", options: ["End a sentence", "Mark the topic of a sentence", "Express emotion", "Ask a question"], a: "Mark the topic of a sentence" },
      { type: "mcq", q: "You want someone to say something again. You say:", options: ["すみません", "もう一度お願いします", "ありがとう", "いいえ"], a: "もう一度お願いします" },
      { type: "mcq", q: "A friend gives you a gift. You say:", options: ["すみません", "いいえ", "ありがとう", "わかりません"], a: "ありがとう" },
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
      { type: "mcq", q: "How are Italian vowels (a, e, i, o, u) typically pronounced?", options: ["Silently", "Clearly and fully", "Only at the start of words", "The same as in English"], a: "Clearly and fully" },
      { type: "mcq", q: "You run into a friend on the street in Rome. You say:", options: ["Prego", "Grazie", "Ciao", "Non capisco"], a: "Ciao" },
      { type: "fill", q: "I don't understand: Non ___", a: "capisco" },
      { type: "mcq", q: "What is the difference between 'nonno' and 'nono'?", options: ["They mean the same thing", "The double 'n' is held longer, changing the meaning", "One is formal, one is informal", "One is a verb, one is a noun"], a: "The double 'n' is held longer, changing the meaning" },
      { type: "mcq", q: "Someone holds the door for you. You say:", options: ["Ciao", "No", "Grazie", "Non capisco"], a: "Grazie" },
      { type: "fill", q: "Thank you: ___", a: "grazie" },
      { type: "mcq", q: "Your Italian tutor speaks too quickly and you're confused. You ask:", options: ["Ciao!", "Può ripetere?", "Prego", "Sì"], a: "Può ripetere?" },
      { type: "fill", q: "Can you repeat?: Può ___?", a: "ripetere" },
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
          { type: "mcq", q: "It's 3 PM and you greet a colleague. Which greeting fits best?", options: ["Buenos días", "Buenas tardes", "Buenas noches", "Adiós"], a: "Buenas tardes" },
          { type: "mcq", q: "You meet someone at a party. After exchanging names, you say:", options: ["Adiós", "Mucho gusto", "Por favor", "Buenos días"], a: "Mucho gusto" },
          { type: "fill", q: "What's your name? (informal): ¿Cómo te ___?", a: "llamas" },
          { type: "mcq", q: "Which word would you use with an elderly stranger instead of 'tú'?", options: ["Yo", "Usted", "Nosotros", "Ellos"], a: "Usted" },
          { type: "fill", q: "My name is…: Me ___…", a: "llamo" },
          { type: "mcq", q: "You're leaving a shop after buying something. The shopkeeper says 'Gracias.' You reply:", options: ["Adiós", "Hola", "Buenos días", "Gracias a usted"], a: "Gracias a usted" },
          { type: "mcq", q: "It's 10 PM. Which greeting would you use?", options: ["Buenos días", "Buenas tardes", "Buenas noches", "Hola, buenos días"], a: "Buenas noches" },
          { type: "fill", q: "Goodbye: ___", a: "adiós" },
          { type: "mcq", q: "Someone asks '¿Cómo te llamas?' What are they asking?", options: ["How are you?", "Where are you from?", "What is your name?", "How old are you?"], a: "What is your name?" },
          { type: "mcq", q: "Which pair correctly shows formal vs. informal 'you'?", options: ["tú / usted", "yo / él", "nosotros / ellos", "ella / usted"], a: "tú / usted" },
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
          { type: "mcq", q: "You're at a market and want to know the price of an item. You ask:", options: ["¿Cómo te llamas?", "¿Cuánto cuesta?", "¿Buenos días?", "¿Dónde está?"], a: "¿Cuánto cuesta?" },
          { type: "fill", q: "The number 5 in Spanish: ___", a: "cinco" },
          { type: "mcq", q: "A vendor says 'Son tres euros.' How much do you owe?", options: ["1 euro", "3 euros", "5 euros", "15 euros"], a: "3 euros" },
          { type: "mcq", q: "Before a masculine noun, 'uno' changes to:", options: ["una", "un", "unos", "unas"], a: "un" },
          { type: "fill", q: "Ten: ___", a: "diez" },
          { type: "mcq", q: "Put these numbers in order: tres, uno, cinco, dos", options: ["uno, dos, tres, cinco", "tres, uno, cinco, dos", "cinco, tres, dos, uno", "dos, uno, tres, cinco"], a: "uno, dos, tres, cinco" },
          { type: "fill", q: "Fifteen: ___", a: "quince" },
          { type: "mcq", q: "You buy 4 apples. How do you say '4' in Spanish?", options: ["tres", "cinco", "cuatro", "dos"], a: "cuatro" },
          { type: "mcq", q: "Which sentence correctly says 'It's five euros'?", options: ["Son cinco euros", "Cuánto cinco euros", "Cinco son euros", "Es cuesta cinco"], a: "Son cinco euros" },
          { type: "fill", q: "Two: ___", a: "dos" },
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
          { type: "mcq", q: "To conjugate 'hablar' for 'I', you remove '-ar' and add:", options: ["-o", "-as", "-a", "-an"], a: "-o" },
          { type: "fill", q: "I speak: Yo ___ (hablar)", a: "hablo" },
          { type: "mcq", q: "Your friend asks what you do for a living. You say 'Yo trabajo.' What verb is this from?", options: ["hablar", "trabajar", "estudiar", "vivir"], a: "trabajar" },
          { type: "mcq", q: "'Ella estudia mucho' means:", options: ["She works a lot", "She studies a lot", "She eats a lot", "She lives far away"], a: "She studies a lot" },
          { type: "fill", q: "To eat: ___", a: "comer" },
          { type: "mcq", q: "Which verb does NOT end in '-ar'?", options: ["hablar", "estudiar", "comer", "trabajar"], a: "comer" },
          { type: "mcq", q: "If 'hablar' → 'hablo' (I speak), then 'estudiar' → ___ (I study):", options: ["estudio", "estudias", "estudia", "estudiamos"], a: "estudio" },
          { type: "fill", q: "To live: ___", a: "vivir" },
          { type: "mcq", q: "Which sentence means 'I speak Spanish'?", options: ["Yo como español", "Yo hablo español", "Yo vivo español", "Yo estudio español"], a: "Yo hablo español" },
          { type: "mcq", q: "The verbs 'comer' and 'vivir' belong to which verb groups?", options: ["-ar and -ar", "-er and -ir", "-ar and -ir", "-er and -er"], a: "-er and -ir" },
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
          { type: "mcq", q: "You enter a boutique in Paris. The first thing you should say is:", options: ["Merci", "Au revoir", "Bonjour", "Salut"], a: "Bonjour" },
          { type: "fill", q: "Good evening: ___", a: "bonsoir" },
          { type: "mcq", q: "You're at a formal dinner and want to ask how someone is. You say:", options: ["Salut, ça va?", "Comment allez-vous?", "Bonjour, merci", "Au revoir"], a: "Comment allez-vous?" },
          { type: "mcq", q: "Which word would you use to greet a close friend casually?", options: ["Bonjour", "Bonsoir", "Salut", "S'il vous plaît"], a: "Salut" },
          { type: "fill", q: "Goodbye: Au ___", a: "revoir" },
          { type: "mcq", q: "After introducing yourself, someone says 'Enchanté.' They mean:", options: ["Goodbye", "Thank you", "Pleased to meet you", "See you later"], a: "Pleased to meet you" },
          { type: "mcq", q: "'S'il vous plaît' is used when speaking to:", options: ["Close friends only", "Children only", "Someone formally / politely", "Pets"], a: "Someone formally / politely" },
          { type: "fill", q: "My name is…: Je m'___…", a: "appelle" },
          { type: "mcq", q: "You're speaking to your boss. Which form of 'you' should you use?", options: ["tu", "vous", "je", "il"], a: "vous" },
          { type: "mcq", q: "Which response fits: someone gives you a gift and you want to say thank you?", options: ["Au revoir", "Merci", "Bonjour", "Salut"], a: "Merci" },
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
          { type: "mcq", q: "You're at a café and want to order. You begin with:", options: ["C'est combien?", "Je voudrais…", "Au revoir", "Merci"], a: "Je voudrais…" },
          { type: "fill", q: "The number 3 in French: ___", a: "trois" },
          { type: "mcq", q: "A shopkeeper says 'C'est dix euros.' How much is the item?", options: ["2 euros", "3 euros", "5 euros", "10 euros"], a: "10 euros" },
          { type: "fill", q: "Five: ___", a: "cinq" },
          { type: "mcq", q: "The French word for 70 (soixante-dix) literally translates to:", options: ["Seven-ten", "Sixty-ten", "Seventy", "Fifty-twenty"], a: "Sixty-ten" },
          { type: "mcq", q: "You see a price tag and want to confirm the cost. You ask:", options: ["Bonjour?", "C'est combien?", "Comment?", "Merci?"], a: "C'est combien?" },
          { type: "fill", q: "Ten: ___", a: "dix" },
          { type: "mcq", q: "Which is the correct order: un, ___, trois?", options: ["cinq", "dix", "deux", "quatre"], a: "deux" },
          { type: "mcq", q: "'Je voudrais deux croissants' means:", options: ["I have two croissants", "I would like two croissants", "I see two croissants", "Give me two croissants"], a: "I would like two croissants" },
          { type: "fill", q: "Two: ___", a: "deux" },
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
          { type: "mcq", q: "In French, to say 'I am hungry,' you literally say 'I ___ hunger':", options: ["am", "have", "want", "see"], a: "have" },
          { type: "fill", q: "To be: ___", a: "être" },
          { type: "mcq", q: "Someone asks your occupation. You answer 'Je suis médecin.' What does 'suis' come from?", options: ["avoir", "aller", "être", "faire"], a: "être" },
          { type: "mcq", q: "Which two French verbs are irregular (don't follow standard patterns)?", options: ["parler and aller", "être and avoir", "faire and parler", "aller and parler"], a: "être and avoir" },
          { type: "fill", q: "To go: ___", a: "aller" },
          { type: "mcq", q: "'Je fais du sport' means:", options: ["I watch sports", "I do sports", "I have sports", "I go to sports"], a: "I do sports" },
          { type: "mcq", q: "Complete: 'Je ___ français' (I speak French)", options: ["suis", "ai", "parle", "fais"], a: "parle" },
          { type: "fill", q: "To have: ___", a: "avoir" },
          { type: "mcq", q: "'J'ai faim' uses 'avoir' because French expresses hunger as:", options: ["Being hungry", "Having hunger", "Going hungry", "Making hunger"], a: "Having hunger" },
          { type: "mcq", q: "Which verb means 'to do' or 'to make'?", options: ["aller", "parler", "faire", "être"], a: "faire" },
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
          { type: "mcq", q: "You arrive at a business meeting at 9 AM. You say:", options: ["Gute Nacht", "Guten Morgen", "Hallo, tschüss", "Guten Abend"], a: "Guten Morgen" },
          { type: "fill", q: "My name is…: Ich ___…", a: "heiße" },
          { type: "mcq", q: "Someone passes you the salt at dinner. You say:", options: ["Hallo", "Gute Nacht", "Danke", "Tschüss"], a: "Danke" },
          { type: "mcq", q: "'Bitte' can be used as a response to 'Danke.' In that context it means:", options: ["Please", "You're welcome", "Hello", "Sorry"], a: "You're welcome" },
          { type: "fill", q: "Good day: Guten ___", a: "tag", hint: "3 letters" },
          { type: "mcq", q: "You're at a formal event and want to ask someone's name. You say:", options: ["Wie heißen Sie?", "Hallo, ich bin…", "Guten Morgen", "Freut mich"], a: "Wie heißen Sie?" },
          { type: "mcq", q: "After introducing yourselves, you shake hands and say:", options: ["Danke", "Gute Nacht", "Freut mich", "Bitte"], a: "Freut mich" },
          { type: "fill", q: "Thank you: ___", a: "danke" },
          { type: "mcq", q: "It's 11 PM and you're heading to bed. You say:", options: ["Guten Morgen", "Guten Tag", "Gute Nacht", "Hallo"], a: "Gute Nacht" },
          { type: "mcq", q: "Which greeting is most neutral and works anytime during the day?", options: ["Guten Morgen", "Gute Nacht", "Guten Tag", "Guten Abend"], a: "Guten Tag" },
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
          { type: "mcq", q: "You want to know the time. You ask:", options: ["Wie heißen Sie?", "Wie spät ist es?", "Wie viel kostet das?", "Guten Tag?"], a: "Wie spät ist es?" },
          { type: "fill", q: "Three: ___", a: "drei" },
          { type: "mcq", q: "Someone says 'Es ist fünf Uhr.' What time is it?", options: ["3 o'clock", "5 o'clock", "10 o'clock", "2 o'clock"], a: "5 o'clock" },
          { type: "mcq", q: "You're shopping and want to ask the price. You say:", options: ["Wie spät ist es?", "Wie heißen Sie?", "Wie viel kostet das?", "Danke schön"], a: "Wie viel kostet das?" },
          { type: "fill", q: "Ten: ___", a: "zehn" },
          { type: "mcq", q: "Put these in order: drei, eins, fünf, zwei", options: ["eins, zwei, drei, fünf", "zwei, drei, eins, fünf", "fünf, drei, zwei, eins", "drei, eins, fünf, zwei"], a: "eins, zwei, drei, fünf" },
          { type: "fill", q: "Five: ___", a: "fünf" },
          { type: "mcq", q: "The word 'Uhr' in German means:", options: ["Hour", "O'clock / Clock", "Time zone", "Minute"], a: "O'clock / Clock" },
          { type: "mcq", q: "A shopkeeper says 'Das kostet zwei Euro.' How much is it?", options: ["1 euro", "2 euros", "3 euros", "5 euros"], a: "2 euros" },
          { type: "fill", q: "Two: ___", a: "zwei" },
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
          { type: "mcq", q: "It's 2 PM and you greet your neighbor. You say:", options: ["おはよう", "こんにちは", "こんばんは", "さようなら"], a: "こんにちは" },
          { type: "mcq", q: "You're meeting a new colleague for the first time. After your name, you say:", options: ["さようなら", "すみません", "はじめまして", "おはよう"], a: "はじめまして" },
          { type: "mcq", q: "You want to get a waiter's attention at a restaurant. You say:", options: ["ありがとう", "こんにちは", "すみません", "さようなら"], a: "すみません" },
          { type: "mcq", q: "The particle は in 'こんにちは' is pronounced:", options: ["ha", "wa", "ka", "sa"], a: "wa" },
          { type: "mcq", q: "After someone does you a favor, you say:", options: ["すみません", "さようなら", "ありがとう", "おはよう"], a: "ありがとう" },
          { type: "mcq", q: "It's early morning at the office. You greet your coworker with:", options: ["こんばんは", "さようなら", "こんにちは", "おはようございます"], a: "おはようございます" },
          { type: "mcq", q: "'お元気ですか' is equivalent to which English phrase?", options: ["What's your name?", "How are you?", "Where are you going?", "What time is it?"], a: "How are you?" },
          { type: "mcq", q: "At the end of a self-introduction, Japanese people often say:", options: ["さようなら", "すみません", "よろしくお願いします", "ありがとう"], a: "よろしくお願いします" },
          { type: "mcq", q: "You're leaving a friend's house for the last time before moving away. You say:", options: ["おはよう", "こんにちは", "すみません", "さようなら"], a: "さようなら" },
          { type: "mcq", q: "Which is more polite: 'ありがとう' or 'ありがとうございます'?", options: ["ありがとう", "ありがとうございます", "They are the same", "Neither is polite"], a: "ありがとうございます" },
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
          { type: "mcq", q: "You're at a convenience store and want to know the price. You ask:", options: ["すみません", "ありがとう", "いくらですか", "こんにちは"], a: "いくらですか" },
          { type: "mcq", q: "The kanji 三 represents which number?", options: ["One", "Two", "Three", "Five"], a: "Three" },
          { type: "mcq", q: "Japanese uses special words after numbers when counting objects. These are called:", options: ["Particles", "Counters", "Conjugations", "Honorifics"], a: "Counters" },
          { type: "mcq", q: "You want to order 2 coffees. You say 'コーヒーを二つください.' What does '二つ' mean?", options: ["One (thing)", "Two (things)", "Three (things)", "Five (things)"], a: "Two (things)" },
          { type: "mcq", q: "The number 四 has two readings: よん and し. Which reading is generally avoided because it sounds like 'death'?", options: ["よん", "し", "Both are fine", "Neither"], a: "し" },
          { type: "mcq", q: "What does '〜をください' mean?", options: ["How much?", "Please give me…", "Excuse me", "Thank you"], a: "Please give me…" },
          { type: "mcq", q: "The kanji 十 (じゅう) represents:", options: ["Five", "Seven", "Ten", "One hundred"], a: "Ten" },
          { type: "mcq", q: "Put these in numerical order: 五, 二, 四, 一", options: ["一, 二, 四, 五", "五, 四, 二, 一", "二, 一, 五, 四", "一, 四, 二, 五"], a: "一, 二, 四, 五" },
          { type: "mcq", q: "You hand money to a cashier and they give you change. You say:", options: ["いくらですか", "ありがとうございます", "すみません", "さようなら"], a: "ありがとうございます" },
          { type: "mcq", q: "What is 五 + 五 in Japanese?", options: ["五 (ご)", "十 (じゅう)", "二 (に)", "三 (さん)"], a: "十 (じゅう)" },
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
          { type: "mcq", q: "You walk into an Italian office at 10 AM. You greet the receptionist with:", options: ["Ciao", "Buonasera", "Buongiorno", "Arrivederci"], a: "Buongiorno" },
          { type: "fill", q: "My name is…: Mi ___…", a: "chiamo" },
          { type: "mcq", q: "A waiter brings your food. You say:", options: ["Arrivederci", "Grazie", "Buonasera", "Ciao"], a: "Grazie" },
          { type: "mcq", q: "You're speaking to an older person you've just met. You should use:", options: ["tu", "Lei", "io", "noi"], a: "Lei" },
          { type: "fill", q: "Goodbye (formal): ___", a: "arrivederci" },
          { type: "mcq", q: "Someone thanks you for holding the door. You respond with:", options: ["Grazie", "Ciao", "Prego", "Buongiorno"], a: "Prego" },
          { type: "mcq", q: "You meet someone new and they say 'Piacere.' They mean:", options: ["Goodbye", "Thank you", "Pleased to meet you", "You're welcome"], a: "Pleased to meet you" },
          { type: "fill", q: "Good evening: ___", a: "buonasera" },
          { type: "mcq", q: "'Ciao' is unique because it can mean both:", options: ["Please and thank you", "Hello and goodbye", "Yes and no", "Good morning and good night"], a: "Hello and goodbye" },
          { type: "mcq", q: "Someone asks 'Come ti chiami?' What information do they want?", options: ["Your age", "Your name", "Your nationality", "Your job"], a: "Your name" },
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
          { type: "mcq", q: "Someone asks where you're from. You say 'Sono di Milano.' The verb 'sono' comes from:", options: ["avere", "andare", "essere", "parlare"], a: "essere" },
          { type: "fill", q: "To eat: ___", a: "mangiare" },
          { type: "mcq", q: "Like French, Italian expresses hunger using 'to have.' 'Ho fame' literally means:", options: ["I am hunger", "I have hunger", "I feel hunger", "I go hunger"], a: "I have hunger" },
          { type: "mcq", q: "Italian verbs are grouped by their endings. Which are the three groups?", options: ["-ar, -er, -ir", "-are, -ere, -ire", "-are, -ore, -ure", "-are, -ire, -ure"], a: "-are, -ere, -ire" },
          { type: "fill", q: "To speak: ___", a: "parlare" },
          { type: "mcq", q: "To conjugate 'parlare' for 'I', you change it to:", options: ["parli", "parla", "parlo", "parlano"], a: "parlo" },
          { type: "mcq", q: "You're at a train station and need to go to Florence. Which verb describes your action?", options: ["essere", "avere", "parlare", "andare"], a: "andare" },
          { type: "fill", q: "To have: ___", a: "avere" },
          { type: "mcq", q: "Which sentence means 'I speak Italian'?", options: ["Ho italiano", "Sono italiano", "Parlo italiano", "Mangio italiano"], a: "Parlo italiano" },
          { type: "mcq", q: "The verb 'essere' is irregular, meaning:", options: ["It follows standard conjugation rules", "It doesn't follow the regular -ere pattern", "It's never used", "It's only used in writing"], a: "It doesn't follow the regular -ere pattern" },
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
