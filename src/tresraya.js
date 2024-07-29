document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.querySelector(".status");
  const restartButton = document.querySelectorAll(".restart")[0];
  const scoreDisplay = document.querySelector(".score");

  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
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

  let isPlayerTurn = true;
  let playerScore = readScore();

  function readScore() {
    const storedScore = localStorage.getItem("playerScore");
    return storedScore ? parseInt(storedScore, 10) : 0;
  }

  function saveScore(score) {
    localStorage.setItem("playerScore", score);
  }

  function updateScoreDisplay() {
    if (scoreDisplay) {
      scoreDisplay.innerHTML = `Récord: ${readScore()}`;
    }
  }

  updateScoreDisplay();

  const handleCellClick = (e) => {
    if (!isPlayerTurn) return;

    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !isGameActive()) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (checkWin()) {
      setTimeout(() => {
        if (currentPlayer === "X") {
          playerScore++;
          saveScore(playerScore);
          updateScoreDisplay();
        }
        alert(`Jugador ${currentPlayer} ha ganado!`);
        handleRestart();
      }, 100);
      return;
    }

    if (isDraw()) {
      setTimeout(() => {
        alert("Empate!");
        handleRestart();
      }, 100);
      return;
    }

    isPlayerTurn = false;
    currentPlayer = "O";
    statusText.innerHTML = `Turno de la máquina`;

    setTimeout(makeMachineMove, 500);
  };

  const makeMachineMove = () => {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
      if (cell === "") emptyCells.push(index);
    });

    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = "O";
    document.querySelector(`.cell[data-index='${randomIndex}']`).innerHTML =
      "O";

    if (checkWin()) {
      setTimeout(() => {
        alert(`La máquina ha ganado!`);
        handleRestart();
      }, 100);
      return;
    }

    if (isDraw()) {
      setTimeout(() => {
        alert("Empate!");
        handleRestart();
      }, 100);
      return;
    }

    isPlayerTurn = true;
    currentPlayer = "X";
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
    return gameState.every((cell) => cell !== "");
  };

  const isGameActive = () => {
    return !checkWin() && !isDraw();
  };

  const handleRestart = () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isPlayerTurn = true;
    cells.forEach((cell) => (cell.innerHTML = ""));
    statusText.innerHTML = `Turno del jugador ${currentPlayer}`;
  };

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", () => {
    playerScore = 0;
    saveScore(playerScore);
    updateScoreDisplay();
    handleRestart();
  });
  statusText.innerHTML = `Turno del jugador ${currentPlayer}`;
});

export { tresenraya };
