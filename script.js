document.getElementById("submit").addEventListener("click", startGame);

let currentPlayer = "X";
let player1, player2;
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function startGame() {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.querySelector(".player-names").style.display = "none";
  document.querySelector(".game-board").style.display = "block";
  updateMessage();

  // Reset game variables
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.textContent = "");
}

function updateMessage() {
  const message = document.querySelector(".message");
  if (gameOver) {
    message.textContent = `${currentPlayer === "X" ? player2 : player1} Congratulations, you won!`;
  } else {
    message.textContent = `${currentPlayer === "X" ? player1 : player2}, you're up!`;
  }
}

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const cellId = parseInt(cell.id) - 1;

  if (board[cellId] !== "" || gameOver) return;

  // Mark the cell
  board[cellId] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for winner
  if (checkWinner()) {
    gameOver = true;
    updateMessage();
    return;
  }

  // Change turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage();
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] === board[b] && board[b] === board[c] && board[a] !== "";
  });
}
