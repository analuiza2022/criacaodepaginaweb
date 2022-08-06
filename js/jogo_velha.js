const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMensageTextElement = document.querySelector(
    "[data-winning-mensage-text]"
);
const winningMensage = document.querySelector("[data-winning-mensage]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleturn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const startGame = () => {
    isCircleturn = false;
    for (const cell of cellElements) {
        cell.classList.remove("cicle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    }    

    setBoardHoverClass();
    winningMensage.classList.remove("show-winning-mensage");
};
const endGame = (isDraw) => {
    if (isDraw) {
      winningMensageTextElement.innerText = "Empate!";
    } else {
      winningMensageTextElement.innerText = isCircleturn
        ? "O Venceu!"
        : "X Venceu!";
    }    

    winningMensage.classList.add("show-winning-mensage");
};  
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((Combination) => {
            return combination.every((index) => {
                return cellElements[index].classList, contains(currentPlayer);
       });
    });
}; 

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("cicle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("cicle");
    board.classList.remove("x");

    if (isCircleturn) {
        board.classList.add("cicle");
    } else {
        board.classList.add("x");
    }    
};
const swapTurns = () => {
    isCircleturn = !isCircleturn;

    setBoardHoverClass();
};
const handleClick= (e) => {
    // Colocar a marca (X ou circulo)
    const cell = e.target;
    const classToAdd = isCircleturn ? "cicle": "x";

    placeMark(cell, classToAdd);

    // Verificar por vitoria
    const isWin = checkForWin(classToAdd);

    // Verificar por empate
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // Mudar simbolo
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);