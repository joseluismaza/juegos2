const wordsWithHints = [
  { word: "javascript", hint: "Lenguaje de programación web" },
  { word: "programacion", hint: "Proceso de crear software" },
  { word: "ahorcado", hint: "Juego de adivinar palabras" },
  { word: "juego", hint: "Actividad de entretenimiento" },
  { word: "desarrollador", hint: "Persona que crea software" },
];

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordElement = document.getElementById("word");
const hintElement = document.getElementById("hint");
const lettersElement = document.getElementById("letters");
const hangmanParts = document.querySelectorAll(".part");
const restartAhorcadoButton = document.querySelectorAll(".restart")[2];

function startHangmanGame() {
  const randomWordWithHint =
    wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
  selectedWord = randomWordWithHint.word;
  hintElement.textContent = `Pista: ${randomWordWithHint.hint}`;
  guessedLetters = [];
  wrongGuesses = 0;
  hangmanParts.forEach((part) => (part.style.display = "none"));

  wordElement.textContent = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  lettersElement.innerHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button class="letter" data-letter="${letter}">${letter}</button>`,
    )
    .join("");

  document.querySelectorAll(".letter").forEach((button) => {
    button.addEventListener("click", handleLetterClick);
  });
}

function handleLetterClick(e) {
  const letter = e.target.getAttribute("data-letter");
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    wordElement.textContent = selectedWord
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");

    if (!wordElement.textContent.includes("_")) {
      setTimeout(() => {
        alert("¡Has ganado!");
      }, 100);
    }
  } else {
    wrongGuesses++;
    hangmanParts[wrongGuesses - 1].style.display = "block";

    if (wrongGuesses === maxWrongGuesses) {
      setTimeout(() => {
        alert(`¡Has perdido! La palabra era: ${selectedWord}`);
      }, 100);
    }
  }
}

restartAhorcadoButton.addEventListener("click", startHangmanGame);

export { startHangmanGame };
