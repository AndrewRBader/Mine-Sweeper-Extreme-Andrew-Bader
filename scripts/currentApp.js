document.addeventListener ('DOMContentLoaded', () => {


// grabbing gameboard (cellfield) for custom boards

const gameBoard = document.querySelector('.cellfield')
let width = 10 
let numberOfCells = width*width;
let cellEls = [];


//custom board creation:

function customBoardGeneration () {
    for (let cell = 0; cell < numberOfCells; cell++){
        const cellEl = document.createElement('div');
        cellEl.setAttribute('id', cell);
        gameBoard.appendChild(cellEl)
        cellEls.push(cellEl)
    }
}

customBoardGeneration()




})
