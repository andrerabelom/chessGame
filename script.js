let circleTurn;
const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
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

cellElements = document.querySelectorAll(`[data-cell]`);
table = document.querySelector("#table");
winningDiv = document.querySelector("#winningDiv");
winningMessage = document.querySelector("#winningMessage");
restartButton = document.querySelector("#restartButton");

startGame();

function startGame() {
	let counter=0;
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.addEventListener("click", handleClick, { once: true });
		counter++;
	});
	setBoardHoverClass();
}

function handleClick(e) {
	cell = e.target;
	currentClass = circleTurn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
	placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(currentClass);
    }
	else if (isDraw()){
		draw="draw";
		endGame(draw);
	}

	swapTurns();
	setBoardHoverClass();
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function setBoardHoverClass() {
	table.classList.remove(PLAYER_X_CLASS);
	table.classList.remove(PLAYER_O_CLASS);

	if (circleTurn) {
		table.classList.add(PLAYER_O_CLASS);
	} else {
		table.classList.add(PLAYER_X_CLASS);
	}
}

function endGame(currentClass){
	winningDiv.classList.toggle("hide");
	table.classList.toggle("hide");

	winningMessage.innerText = (`${currentClass} wins!`).toUpperCase();



	restartButton.addEventListener( "click", restartGame);


}

function restartGame() {
	winningDiv.classList.toggle("hide");
	table.classList.toggle("hide");

	cleanBoard();

	startGame();
}


function cleanBoard() {
	cellElements.forEach((cell) => {
		cell.classList.remove(PLAYER_O_CLASS);
		cell.classList.remove(PLAYER_X_CLASS);
	});
}

function swapTurns() {
	circleTurn = !circleTurn;
}


function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })

}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}
