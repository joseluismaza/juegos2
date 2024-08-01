const choices = document.querySelectorAll('.choice');
const playerChoiceText = document.getElementById('playerChoice');
const computerChoiceText = document.getElementById('computerChoice');
const resultText = document.getElementById('result');
const restartPiedraButton = document.querySelectorAll('.restart')[1];

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const playerChoice = choice.getAttribute('data-choice');
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    playerChoiceText.textContent = `Jugador: ${playerChoice}`;
    computerChoiceText.textContent = `Computadora: ${computerChoice}`;
    resultText.textContent = `Resultado: ${result}`;

    if (result === 'Ganaste') {
      setTimeout(() => {
        alert('¡Has ganado!');
      }, 100);
    } else if (result === 'Perdiste') {
      setTimeout(() => {
        alert('¡Has perdido!');
      }, 100);
    } else {
      setTimeout(() => {
        alert('¡Es un empate!');
      }, 100);
    }
  });
});

function getComputerChoice() {
  const choices = ['piedra', 'papel', 'tijeras'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'Empate';
  } else if (
    (playerChoice === 'piedra' && computerChoice === 'tijeras') ||
    (playerChoice === 'papel' && computerChoice === 'piedra') ||
    (playerChoice === 'tijeras' && computerChoice === 'papel')
  ) {
    return 'Ganaste';
  } else {
    return 'Perdiste';
  }
}

restartPiedraButton.addEventListener('click', () => {
  playerChoiceText.textContent = 'Jugador: ';
  computerChoiceText.textContent = 'Computadora: ';
  resultText.textContent = 'Resultado: ';
});

function papeltijeras() {
  // Inicializa el juego aquí si es necesario
}

export { papeltijeras };
