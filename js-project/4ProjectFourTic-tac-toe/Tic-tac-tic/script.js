document.addEventListener("DOMContentLoaded", function () {
    const boardElement = document.querySelector(".board");
    const statusElement = document.querySelector(".status");
    const resetBtn = document.querySelector(".btn-reset");
    //dom mnipulation
    const gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];


    function renderBoard() {
        boardElement.innerHTML = "";
        gameBoard.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = value;
            cell.addEventListener("click", () => cellClick(index));
            if (cell.textContent === "") {
                cell.addEventListener("mouseover", onMouseOver);
                cell.addEventListener("mouseleave", onMouseLeave);
            }
            boardElement.appendChild(cell);
        })
    };

    function cellClick(index) {
        if (gameBoard[index] === "" && !isGameOver()) {
            gameBoard[index] = currentPlayer;
            console.log(gameBoard)
            renderBoard();
            if (checkWinner()) {
                statusElement.textContent = `${currentPlayer} wins`;
                resetBtn.style.display = "block";
            } else if (isBoardFull()) {
                statusElement.textContent = "it is a draw";
                resetBtn.style.display = "block";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusElement.textContent = `Current player: ${currentPlayer}`;
            }
        }
    };

    function checkWinner() {
        return WINNING_COMBINATIONS.some((combination) => {
            [a, b, c] = combination;
            return (
                gameBoard[a] !== "" &&
                gameBoard[a] === gameBoard[b] &&
                gameBoard[a] === gameBoard[c]
            );
        })
    };

    function isBoardFull() {
        return gameBoard.every((cell) => cell !== "");
    };

    function isGameOver() {
        return checkWinner() || isBoardFull();
    };

    function onMouseOver(event) {
        event.target.classList.add(currentPlayer);
    };

    function onMouseLeave(event) {
        event.target.classList.remove(currentPlayer);
    };

    function reset() {
        gameBoard.forEach((cell, index) => gameBoard[index] = "")
        renderBoard();
        resetBtn.style.display = "none";
    };

    resetBtn.addEventListener("click", reset);


    renderBoard();

})


