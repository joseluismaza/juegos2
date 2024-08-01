document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const statusText = document.querySelector('.status');
  const restartButton = document.querySelectorAll('.restart')[0];
  const scoreDisplay = document.querySelector('.score'); // Elemento para mostrar el récord

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let isPlayerTurn = true; // Variable para controlar el turno del jugador
  let playerScore = readScore(); // Puntuación del jugador

  // Lee el récord desde el localStorage
  function readScore() {
    const storedScore = localStorage.getItem('playerScore');
    return storedScore ? parseInt(storedScore, 10) : 0;
  }

  // Guarda el récord en el localStorage
  function saveScore(score) {
    localStorage.setItem('playerScore', score);
  }

  // Actualiza el marcador en la pantalla
  function updateScoreDisplay() {
    if (scoreDisplay) {
      scoreDisplay.innerHTML = `Récord: ${readScore()}`;
    }
  }

  // Muestra el récord al cargar la página
  updateScoreDisplay();

  const handleCellClick = (e) => {
    if (!isPlayerTurn) return; // Si no es el turno del jugador, no hacer nada

    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive()) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (checkWin()) {
      setTimeout(() => {
        if (currentPlayer === 'X') {
          playerScore++;
          saveScore(playerScore);
          updateScoreDisplay();
        }
        alert(`Jugador ${currentPlayer} ha ganado!`);
        handleRestart(); // Reinicia el juego automáticamente
      }, 100);
      return;
    }

    if (isDraw()) {
      setTimeout(() => {
        alert('Empate!');
        handleRestart(); // Reinicia el juego automáticamente
      }, 100);
      return;
    }

    // Turno de la máquina
    isPlayerTurn = false;
    currentPlayer = 'O';
    statusText.innerHTML = `Turno de la máquina`;

    setTimeout(makeMachineMove, 500);
  };

  const makeMachineMove = () => {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
      if (cell === '') emptyCells.push(index);
    });

    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = 'O';
    document.querySelector(`.cell[data-index='${randomIndex}']`).innerHTML = 'O';

    if (checkWin()) {
      setTimeout(() => {
        alert(`La máquina ha ganado!`);
        handleRestart(); // Reinicia el juego automáticamente
      }, 100);
      return;
    }

    if (isDraw()) {
      setTimeout(() => {
        alert('Empate!');
        handleRestart(); // Reinicia el juego automáticamente
      }, 100);
      return;
    }

    // Turno del jugador
    isPlayerTurn = true;
    currentPlayer = 'X';
    statusText.innerHTML = `Turno del jugador ${currentPlayer}`;
  };

  const checkWin = () => {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const isDraw = () => {
    return gameState.every((cell) => cell !== '');
  };

  const isGameActive = () => {
    return !checkWin() && !isDraw();
  };

  const handleRestart = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isPlayerTurn = true; // Reiniciamos el turno del jugador
    cells.forEach((cell) => (cell.innerHTML = ''));
    statusText.innerHTML = `Turno del jugador ${currentPlayer}`;
  };

  cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
  restartButton.addEventListener('click', () => {
    playerScore = 0; // Borra el marcador al reiniciar el juego
    saveScore(playerScore);
    updateScoreDisplay();
    handleRestart();
  });
  statusText.innerHTML = `Turno del jugador ${currentPlayer}`;
});

function tresenraya() {
  // Inicializa el juego aquí si es necesario
}

export { tresenraya };
