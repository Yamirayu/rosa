const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
    "[data-mensagem-vitoria-text]"
);
const winningMessege =  document.querySelector("[data-mensagem-vitoria]")
const restartButton = document.querySelector("[data-restart-button]")
let isCircleturn;

const winningConbinations = [
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
    isCircleturn =  false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    }
    

    setBoardHoverClass()
    winningMessege.classList.remove("show-mensagem-vitoria")
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate"
   
    } else {
        winningMessageTextElement.innerText = isCircleturn? "Circulo Venceu!" : "X Venceu!";

    }

    winningMessege.classList.add("show-mensagem-vitoria");
};


const checkForWin = (currentPlayer) => {
    return winningConbinations.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentPlayer);                
         });
    });
};

const checkForDraw = () => {
    return [ ...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
 };

const placeMark = ( cell, classtoadd) =>{
    cell.classList.add(classtoadd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCircleturn) {
        board.classList.add("circle");
    } else{
        board.classList.add("x");
    }
};
 
const swapTurns = () =>{
    isCircleturn = !isCircleturn;

    setBoardHoverClass();
};


const handleClick = (e) =>{
    //colocar a marca (x ou circulo)
    const cell = e.target;
    const classtoadd = isCircleturn ? "circle" : "x";

    placeMark(cell, classtoadd);

    const isWin = checkForWin(classtoadd);
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    }else{
        swapTurns();
    }

};

startGame();

restartButton.addEventListener("click", startGame);
