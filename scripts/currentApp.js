
//grabbing the cell divs and the gameboard to manipulate
const gameBoard = document.querySelector('.cellfield')
const cells = document.querySelectorAll('.cell')
let width = Math.sqrt(cells.length)
let totalCellNumber = width * width

// set cells with id's and append children to the gameBoard grid

function setCellIds () {
    for (i = 0; i < totalCellNumber; i++){
        cells[i].setAttribute('id', i);
        gameBoard.appendChild(cells[i])
    }
}

setCellIds()

// next want to set up bombs with function

//setting up bombs empty array and number of bombs variable

const numberOfBombs = 10;
const bombsArray = [];

function bombSetUp () {
    for (i = 0; i<numberOfBombs; i++){
        bombsArray.push('bomb')
    }
}

bombSetUp ()

// next want to set up the empty tiles

//empty tiles array bounded by number of empty tiles

const emptyCellsArray = [];
const numberEmptyCells = totalCellNumber - numberOfBombs

function emptyCellsSetup () {
    for (i = 0; i < numberEmptyCells; i++){
        emptyCellsArray.push('empty')
    }
}

emptyCellsSetup()

//concatanate the empty cells with the bomb cells
const bombAndEmptyArray = emptyCellsArray.concat(bombsArray)

//randomized the concatanated array
const randomizedGameArray = bombAndEmptyArray.sort(() => Math.random() -0.5);

//next the board needs to be set up and random classes will be added to the divs

function randomizedCellClasses (){
    for (i = 0; i < totalCellNumber; i++){
        cells[i].setAttribute('class', randomizedGameArray[i]);
        gameBoard.appendChild(cells[i])
    }
}

randomizedCellClasses()


//putting numbers on the empty squares adjacent to the bombs:
 // adapted from Traversy Media: https://www.youtube.com/watch?v=W0No1JDc6vE&t=71s
 

function settingAdjacentNumbers (){

 for (i = 0; i < totalCellNumber; i++){
    let numberAdjacentBombs = 0;
    const onLeftEdge = (i % width === 0)
    const onRightEdge = (i % width === (width - 1))

    if (cells[i].classList.contains('empty')){

        //need 8 total conditions to check bombs, also bombs can't be beyond the sides
        //checking bombs above 
        //checking bomb up and to the right
        if (i > 0 && !onLeftEdge && cells[i - 1].classList.contains('bomb')){ numberAdjacentBombs++}
        if (i > (width - 1) && !onRightEdge && cells[i - 1].classList.contains('bomb')){ numberAdjacentBombs++}
        //checking bomb right above 
        if (i > width && cells[i - width].classList.contains('bomb')){ numberAdjacentBombs++}
        //checking bomb to upper left
        if (i > (width + 1) && !onLeftEdge && cells[i - (width + 1)].classList.contains('bomb')){ numberAdjacentBombs++}

        //checking cells on the bottom row next
        // checking on bomb to the right
        if (i < (totalCellNumber - 2) && !onRightEdge && cells[i + 1].classList.contains('bomb')){ numberAdjacentBombs++}
        // check on bomb in cell to the bottom left
        if (i < (totalCellNumber - width) && !onLeftEdge && cells[i + width-1].classList.contains('bomb')){ numberAdjacentBombs++}
        // check on bomb in cell to the bottom right
        if (i < (totalCellNumber - width - 2) && !onRightEdge && cells[i + width + 1].classList.contains('bomb')){ numberAdjacentBombs++}
        //checking cell right underneath (don't need to check if this is on the right edge)
        if (i < (totalCellNumber - width - 1) && cells[i + width].classList.contains('bomb')){ numberAdjacentBombs++}

        // setting cell data attribute to # of adjacent bombs for adjacent cells and innerHTML to the data
        cells[i].setAttribute('data', numberAdjacentBombs)
        cells[i].innerHTML = cells[i].getAttribute('data')
        
    }
}
}

settingAdjacentNumbers()

// setting inner HTML of bomb cells to bomb

function settingBombCells (){
    for (i = 0; i < totalCellNumber; i++){
        if (cells[i].classList.contains('bomb')){
            cells[i].innerHTML = 'bomb'
        }
    }
}

settingBombCells()


cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.classList.contains('bomb')){
            console.log('game over')
        }
    })
})