document.addEventListener ('DOMContentLoaded', () => {


// grabbing gameboard (cellfield) for custom boards

const gameBoard = document.querySelector('.cellfield')
let width = 10 
let numberOfCells = width*width;

// # of bombs to input into game board

const numberOfBombs = 20;
const bombsArray = [];

// giving bomb array 'bomb' strings

for (let bomb = 0; bomb<numberOfBombs; bomb++){
    bombsArray.push('bomb')
}

console.log(bombsArray)

//used to collect custom gameboard tiles
let cellEls = [];

//custom board creation:

function customBoardGeneration () {
    for (let cell = 0; cell < numberOfCells; cell++){
        const cellEl = document.createElement('div');
        // giving each cell element a unique ID
        cellEl.setAttribute('id', cell);
        // put these cells into a gameBoard grid
        gameBoard.appendChild(cellEl)
        //collect tiles in an array to manipulate with functions
        cellEls.push(cellEl)
    }
}

customBoardGeneration()


//used to collect empty cells that are not bombs

let emptyCellEls = [numberOfCells = numberOfBombs];





})
