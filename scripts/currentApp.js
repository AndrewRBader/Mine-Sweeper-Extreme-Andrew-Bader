
//grabbing the cell divs and the gameboard to manipulate
const gameBoard = document.querySelector('.cellfield')
const cells = document.querySelectorAll('.cell')
let width = Math.sqrt(cells.length)
let totalCellNumber = width * width



// button functionality

// collecting buttons into variable 
let $resetButton = $('#resetButton')
let $startButton = $('#startButton')

//mines are live boolean for active game, bomb explode, bombs diffused 
let minesAreLive = false;
let bombExplode = true;
let bombsDiffused = false;

//difused bomb array
let diffusedBombArray = [];
//setting number of bombs
const numberOfBombs = 10;


//flag button collection
let $flagOnButton = $('#flagOnButton');
let $flagOffButton = $('#flagOffButton');

//starting state of hidden buttons
$flagOnButton.hide()
$flagOffButton.hide()
$resetButton.hide()

//start button event function (buttons fading in and out) sets booleans to live mines, intact bombs, no diffused
$startButton.click(() => {
    $resetButton.fadeIn();
    $flagOnButton.fadeIn()
    $startButton.hide();
    $flagOffButton.hide()
    minesAreLive = true;
    bombExplode = false;
    bombsDiffused = false;
})



//new functions for reset button with new randomization
$resetButton.click(() =>{
    
    //making sure flag on is shown, flag off is hidden
    $flagOnButton.fadeIn()
    $flagOffButton.hide()
    // resetting booleans to live mines, intact and no diffused

    minesAreLive = true;
    bombExplode = false;
    bombsDiffused = false;

    diffusedBombArray = [];
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
        if (i > (width - 1) && !onRightEdge && cells[i + 1 - width].classList.contains('bomb')){ numberAdjacentBombs++}
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

// setting inner HTML of empty cells to empty

function settingEmptyCells (){
    for (i = 0; i < totalCellNumber; i++){
        if (cells[i].classList.contains('empty') && cells[i].innerHTML == 0){
            cells[i].innerHTML = 'empty'
        }
    }
}

settingEmptyCells()


//hiding everything at reset

function hideSquares () {
    for (i = 0; i < totalCellNumber; i++){
        cells[i].classList.add('hidden');
        gameBoard.appendChild(cells[i])
    }
}

hideSquares()


})


// flag button functionality

$flagOnButton.click(() => {

    minesAreLive = false

    $flagOnButton.hide()
    $flagOffButton.fadeIn()

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            $flagOffButton.hide()
            $flagOnButton.fadeIn()
            minesAreLive = true
        })
    })
    $flagOffButton.click(() => {
        $flagOffButton.hide()
        $flagOnButton.fadeIn()
        minesAreLive = true
    })
})








cells.forEach(cell => {
    cell.addEventListener('click', () => {

        if (cell.classList.contains('bomb') || bombsDiffused === true) {
            alert('Please Start or Reset Game')
        } 
        //returns out of function if cell with bomb is already diffused
        else if (cell.classList.contains('diffused')){
            return;
        }
        //returns out of function if cell is already revealed
        else if (cell.classList.contains('revealed')){
            return;
        }
        else {
            if (cell.innerHTML === 'bomb') {
                if (minesAreLive === true) {
                    bombExplode = true;
                    cell.classList.add('bomb')
                     alert('You Lose! Game Over!!')
                }
                else {
                    minesAreLive = true
                    cell.classList.add('diffused')
                    let diffusedBombID = cell.getAttribute('id')
                    diffusedBombArray.push(diffusedBombID)
                    let bombText = cell.innerHTML
                    bombText = 'Diffused'
                    cell.innerHTML = bombText
                    if (diffusedBombArray.length !== numberOfBombs){
                        alert(`Good job!! Keep looking! There are ${numberOfBombs - diffusedBombArray.length} left!!`)
                    }
                    else if (diffusedBombArray.length === numberOfBombs){
                        alert('You Win!!!')
                    }
                }
            }
            else if (cell.innerHTML !== 'empty' && cell.innerHTML !== 'bomb' ) {
                cell.classList.add('revealed') 
                return
            }


            else if (cell.innerHTML === 'empty') {

                let currentID = cell.id

                console.log(currentID)

                // function to reveal empty squares:
                // adapted from Traversy Media: https://www.youtube.com/watch?v=W0No1JDc6vE&t=71s
                const onLeftEdge = (currentID % width === 0)
                const onRightEdge = (currentID % width === width -1)

                // want to put in set timeout to happen slightly after the click
                setTimeout(() => {
                    if (currentID>0 && !onLeftEdge){
                        const newID = cells[parseInt(currentID) - 1].id 
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID > (width - 1) && !onRightEdge){
                        const newID = cells[parseInt(currentID) + 1 - width].id 
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID > width){
                        const newID = cells[parseInt(currentID) - width].id 
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID > (width + 1) && !onLeftEdge){
                        const newID = cells[parseInt(currentID) - (width+1)].id 
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID < (totalCellNumber - 2) && !onRightEdge){
                        const newID = cells[parseInt(currentID)+1].id 
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID < (totalCellNumber - width) && !onLeftEdge) {
                        const newID = cells[parseInt(currentID) + width-1].id
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID < (totalCellNumber - width - 2) && !onRightEdge) {
                        const newID = cells[parseInt(currentID)  + width + 1].id
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    if (currentID < (totalCellNumber - width - 1)) {
                        const newID = cells[parseInt(currentID) + width].id
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    }, 10)

               cell.classList.add('revealed') 
               
            }
            
            
            
        } 









    })
})