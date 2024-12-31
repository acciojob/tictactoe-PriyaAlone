//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

function startGame() {
  const player1 = document.getElementById("player-1").value;
  const player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  const messageDiv = document.querySelector(".message");
  let currentPlayer = player1;
  let currentSymbol = "X";
  let gameOver = false;
  const board = Array(9).fill(null);

  messageDiv.textContent = `${currentPlayer}, you're up!`;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
      if (gameOver || cell.classList.contains("taken")) return;

      const cellId = parseInt(cell.id) - 1;
      board[cellId] = currentSymbol;
      cell.textContent = currentSymbol;
      cell.classList.add("taken");

      if (checkWinner(board, currentSymbol)) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        gameOver = true;
        return;
      }

      if (board.every(cell => cell !== null)) {
        messageDiv.textContent = "It's a draw!";
        gameOver = true;
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      currentSymbol = currentSymbol === "X" ? "O" : "X";
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    });
  });
}

function checkWinner(board, symbol) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination =>
    combination.every(index => board[index] === symbol)
  );
}
