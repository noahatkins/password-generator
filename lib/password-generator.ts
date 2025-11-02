// Word list for memorable passwords (common, easy-to-remember words)
const wordList = [
  "apple",
  "banana",
  "cherry",
  "dolphin",
  "elephant",
  "forest",
  "guitar",
  "honey",
  "island",
  "jelly",
  "kangaroo",
  "lighthouse",
  "mountain",
  "ocean",
  "penguin",
  "quasar",
  "rainbow",
  "sunset",
  "tiger",
  "umbrella",
  "volcano",
  "waterfall",
  "xylophone",
  "yacht",
  "zebra",
  "adventure",
  "butterfly",
  "crystal",
  "diamond",
  "eclipse",
  "firefly",
  "galaxy",
  "horizon",
  "infinity",
  "journey",
  "kingdom",
  "lighthouse",
  "midnight",
  "nebula",
  "orchard",
  "paradise",
  "quest",
  "river",
  "sapphire",
  "thunder",
  "universe",
  "vortex",
  "whisper",
  "xenon",
  "zenith",
  "archer",
  "breeze",
  "castle",
  "dawn",
  "echo",
  "falcon",
  "glacier",
  "harvest",
  "ivory",
  "jade",
  "knight",
  "lantern",
  "meadow",
  "nectar",
  "oasis",
  "phoenix",
  "quartz",
  "reef",
  "shadow",
  "temple",
  "unison",
  "valley",
  "willow",
  "xerox",
  "yogurt",
  "zephyr",
];

const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface PasswordOptions {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

/**
 * Generate a random password based on options
 */
export function generateRandomPassword(options: PasswordOptions): string {
  const {length, includeNumbers, includeSymbols} = options;

  let charset = lowercase + uppercase;

  if (includeNumbers) {
    charset += numbers;
  }

  if (includeSymbols) {
    charset += symbols;
  }

  // Ensure at least one character from each enabled set
  let password = "";

  // Add at least one lowercase
  password += lowercase[Math.floor(Math.random() * lowercase.length)];

  // Add at least one uppercase
  password += uppercase[Math.floor(Math.random() * uppercase.length)];

  // Add at least one number if enabled
  if (includeNumbers) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  // Add at least one symbol if enabled
  if (includeSymbols) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Fill the rest randomly
  while (password.length < length) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return shuffleString(password);
}

/**
 * Generate a memorable password using words
 */
export function generateMemorablePassword(options: PasswordOptions): string {
  const {length, includeNumbers, includeSymbols} = options;

  // Calculate how many words we can fit
  // Average word length is ~6 characters, plus separators
  const avgWordLength = 6;
  const separatorLength = 1; // Each separator is 1 character
  const numLength = includeNumbers ? 2 : 0; // Reserve space for numbers

  // Estimate words needed: (length - numLength) / (avgWordLength + separatorLength)
  const estimatedWords = Math.max(2, Math.floor((length - numLength) / (avgWordLength + separatorLength)));

  const words: string[] = [];
  let currentLength = 0;
  const separators = includeSymbols ? ["-", "_", ".", "!"] : ["-"];

  // Select words that fit within the length
  while (words.length < estimatedWords && currentLength < length - numLength - 2) {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const separatorNeeded = words.length > 0 ? 1 : 0;
    const wordWithSeparator = separatorNeeded + word.length;

    if (currentLength + wordWithSeparator <= length - numLength - 1) {
      words.push(word);
      currentLength += wordWithSeparator;
    } else {
      // Try a shorter word
      const shortWords = wordList.filter((w) => w.length <= word.length - 2);
      if (shortWords.length > 0) {
        const shortWord = shortWords[Math.floor(Math.random() * shortWords.length)];
        const shortWordLength = separatorNeeded + shortWord.length;
        if (currentLength + shortWordLength <= length - numLength - 1) {
          words.push(shortWord);
          currentLength += shortWordLength;
        }
      }
      break;
    }
  }

  // Ensure we have at least 2 words
  if (words.length < 2) {
    const word1 = wordList[Math.floor(Math.random() * wordList.length)];
    let word2 = wordList[Math.floor(Math.random() * wordList.length)];
    // Make sure both words fit
    while (word1.length + word2.length + 1 > length - numLength && wordList.length > 1) {
      word2 = wordList[Math.floor(Math.random() * wordList.length)];
    }
    words.length = 0;
    words.push(word1, word2);
  }

  // Join words with separators
  let password = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  for (let i = 1; i < words.length; i++) {
    const separator = separators[Math.floor(Math.random() * separators.length)];
    password += separator + words[i];
  }

  // Add numbers if enabled
  if (includeNumbers && password.length < length) {
    const numCount = Math.min(2, length - password.length);
    const randomNum = Math.floor(Math.random() * Math.pow(10, numCount))
      .toString()
      .padStart(numCount, "0");

    // Insert number at the end or after a separator
    password += randomNum;
  }

  // Adjust to exact length
  if (password.length > length) {
    password = password.slice(0, length);
  } else if (password.length < length) {
    // Pad with additional characters from the charset
    const remaining = length - password.length;
    const paddingChars = includeNumbers ? numbers : lowercase;
    for (let i = 0; i < remaining; i++) {
      password += paddingChars[Math.floor(Math.random() * paddingChars.length)];
    }
  }

  return password;
}

/**
 * Shuffle a string randomly
 */
function shuffleString(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}
