 let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const statusDisplay = document.getElementById("status");
    const cells = document.querySelectorAll(".cell");

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

    cells.forEach(cell => {
      cell.addEventListener("click", handleClick);
    });

    function handleClick(event) {
      const cell = event.target;
      console.log(cell)
      const index = cell.getAttribute("data-index");
      console.log(index)
      if (gameState[index] !== "" || !gameActive) return;

      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (!gameState.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        );
      });
    }

    function resetGame() {
      currentPlayer = "X";
      gameState = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      statusDisplay.textContent = "Player X's turn";
      cells.forEach(cell => (cell.textContent = ""));
    }
