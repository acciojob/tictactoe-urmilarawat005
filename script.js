//your JS code here. If required.
let currentPlayer = 'X';
  let player1 = '';
  let player2 = '';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  // DOM elements
  const submitButton = document.getElementById('submit');
  const player1Input = document.getElementById('player-1');
  const player2Input = document.getElementById('player-2');
  const gameBoardContainer = document.getElementById('board');
  const messageElement = document.getElementById('message');
  const gameBoardDiv = document.getElementById('game-board');
  const nameInputsDiv = document.getElementById('name-inputs');

  // Create a Tic Tac Toe grid
  function createBoard() {
    gameBoardContainer.innerHTML = '';
    gameBoard.forEach((_, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-id', index);
      cell.addEventListener('click', handleCellClick);
      gameBoardContainer.appendChild(cell);
    });
  }

  // Handle cell clicks
  function handleCellClick(e) {
    const cellId = e.target.getAttribute('data-id');
    if (gameBoard[cellId] !== '' || !gameActive) return;

    // Mark the cell with the current player's symbol
    gameBoard[cellId] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check if someone won
    if (checkWinner()) {
      messageElement.textContent = `${currentPlayer === 'X' ? player1 : player2} congratulations you won!`;
      gameActive = false;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `${currentPlayer === 'X' ? player1 : player2}, you're up`;
  }

  // Check for a winner
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
  }

  // Start game after player names are entered
  submitButton.addEventListener('click', () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (!player1 || !player2) {
      alert('Please enter names for both players');
      return;
    }

    nameInputsDiv.style.display = 'none';
    gameBoardDiv.style.display = 'block';

    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageElement.textContent = `${player1}, you're up`;
    createBoard();
  });