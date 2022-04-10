document.addEventListener ('DOMContentLoaded', () => {


// grabbing gameboard (cellfield) for custom board

const gameBoard = document.querySelector('.cellfield')
let width = 10 
let numberOfCells = width*width;


//used to collect custom gameboard tiles
let cellEls = [];

// # of bombs to input into game board with corresponding aray

const numberOfBombs = 20;
const bombsArray = [];


//used to collect empty cells that are not bombs
const emptyCellArray = [];
const emptyCellElsNumber = numberOfCells - numberOfBombs;

//creating game board tiles of bombs and empty cells

function gameTilesGeneration () {
    
    // bomb tile generation
    // giving bomb array 'bomb' strings

    for (let bomb = 0; bomb<numberOfBombs; bomb++){
        bombsArray.push('bomb')
    }

    //Empty tile generation
    for (let emptyCellEl = 0; emptyCellEl < emptyCellElsNumber; emptyCellEl++){
        emptyCellArray.push('empty');
    }
}

gameTilesGeneration()

//combining the empty and bomb cells to create a "filled array" of bombs and empty squares
const customGameBoardArray = emptyCellArray.concat(bombsArray);

//randomizing the tiles of the game board array
const randomGameBoardArray = customGameBoardArray.sort(() => Math.random() -0.5);
console.log(randomGameBoardArray)

// randomizing the game tiles for random distribution within custom gameboard

//custom board creation:
function customBoardGeneration () {
    for (let cell = 0; cell < numberOfCells; cell++){
        const cellEl = document.createElement('div');
        // giving each cell element a unique ID
        cellEl.setAttribute('id', cell);
        // add the class from random Game Board Array to the divs of the cellfield game board
        cellEl.classList.add(randomGameBoardArray[cell])
        // put these cells into a gameBoard grid
        gameBoard.appendChild(cellEl)
        //collect tiles in an array to manipulate with functions
        cellEls.push(cellEl)
    }
}

customBoardGeneration()



 //putting numbers on the empty squares adjacent to the bombs:
 // adapted from Traversy Media: https://www.youtube.com/watch?v=W0No1JDc6vE&t=71s
 


for (let cell = 0; cell < numberOfCells; cell++){
    let numberAdjacentBombs = 0;
    const onLeftEdge = (cell % width ===0 )
    const onRightEdge = (cell % width === (width - 1))

    if (cellEls[cell].classList.contains('empty')){

        //need 8 total conditions to check bombs, also bombs can't be beyond the sides
        //checking bombs above 
        //checking bomb up and to the right
        if (cell > 0 && !onLeftEdge && cellEls[cell - 1].classList.contains('bomb')) numberAdjacentBombs++
        if (cell > (width - 1) && !onRightEdge && cellEls[cell - 1].classList.contains('bomb')) numberAdjacentBombs++
        //checking bomb right above 
        if (cell > width && cellEls[cell - width].classList.contains('bomb')) numberAdjacentBombs++
        //checking bomb to upper left
        if (cell > (width + 1) && !onLeftEdge && cellEls[cell - (width + 1)].classList.contains('bomb')) numberAdjacentBombs++

        //checking cells on the bottom row next
        // checking on bomb to the right
        if (cell < (numberOfCells - 2) && !onRightEdge && cellEls[cell + 1].classList.contains('bomb')) numberAdjacentBombs++
        // check on bomb in cell to the bottom left
        if (cell < (numberOfCells - width) && !onLeftEdge && cellEls[cell + width-1].classList.contains('bomb')) numberAdjacentBombs++
        // check on bomb in cell to the bottom right
        if (cell < (numberOfCells - width - 2) && !onRightEdge && cellEls[cell + width + 1].classList.contains('bomb')) numberAdjacentBombs++
        //checking cell right underneath (don't need to check if this is on the right edge)
        if (cell < (numberOfCells - width - 1) && cellEls[cell + width].classList.contains('bomb')) numberAdjacentBombs++

        cellEls[cell].setAttribute('data', numberAdjacentBombs)
        console.log(cellEls[cell])
        
    }
    
    
}
















})



