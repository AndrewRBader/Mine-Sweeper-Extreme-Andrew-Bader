document.addEventListener ('DOMContentLoaded', () => {


// grabbing gameboard (cellfield) for custom boards

const gameBoard = document.querySelector('.cellfield')
let width = 10 
let numberOfCells = width*width;





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


//creating game board tiles of bombs and empty cells


function gameTilesGeneration () {

// bomb tile generation
// # of bombs to input into game board

const numberOfBombs = 20;
const bombsArray = [];

// giving bomb array 'bomb' strings

for (let bomb = 0; bomb<numberOfBombs; bomb++){
    bombsArray.push('bomb')
}

//Empty tile generation

//used to collect empty cells that are not bombs
const emptyCellArray = [];
const emptyCellElsNumber = numberOfCells - numberOfBombs;

for (let emptyCellEl = 0; emptyCellEl < emptyCellElsNumber; emptyCellEl++){
    emptyCellArray.push('empty');
}

//combining the empty and bomb cells to create a "filled array" of bombs and empty squares
const customGameBoardArray = emptyCellArray.concat(bombsArray)
//randomizing the tiles of the game board array
const randomGameBoardArray = customGameBoardArray.sort(() => Math.random() -0.5)
console.log(randomGameBoardArray)

}

gameTilesGeneration()

// randomizing the game tiles for random distribution within custom gameboard


})
