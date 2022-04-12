
//grabbing H1 for manipulation
const $h1 = $('h1')

//grabbing and hiding gameBoardSection at Start
const $gameBoardSection = $('.gameboard')
$gameBoardSection.hide()

//grabbing hiding return home button to start
const $returnHomeButton = $('#returnHomeButton')
$returnHomeButton.hide()

//grabbing the cell divs and the cellField gameBoard to manipulate
const cellField = document.querySelector('.cellfield')
const cells = document.querySelectorAll('.cell')

// width of square field is sqrt of the length of cells array
let width = Math.sqrt(cells.length)
// total cell number is width squared (or length of cells array too)
let totalCellNumber = width * width

//win/lose return home screen buttons shown when win or lose the game, hidden till those conditions are met below
const $winHomeScreen = $('#winHomeScreen')
$winHomeScreen.hide()
const $lossHomeScreen =$('#lossHomeScreen')
$lossHomeScreen.hide()

// collecting start button (initial home screen start) and resetbutton into variable 
let $resetButton = $('#resetButton')
let $startButton = $('.startButton')

//mines are live boolean for active game, bomb explode, bombs diffused 
let minesAreLive = false;
let bombExplode = true;
let bombsDiffused = false;

//setting a diffused bomb array, initially empty
let diffusedBombArray = [];
//setting number of bombs (icebox is to make this modifiable at home screen for easy, medium, hard levels)
const numberOfBombs = 20;

//flag button collection
let $flagOnButton = $('#flagOnButton');
let $flagOffButton = $('#flagOffButton');

//starting state of hidden flag/reset buttons
$flagOnButton.hide()
$flagOffButton.hide()
$resetButton.hide()

//counter headers collection and initial hidden state
let $bombsDiffused = $('#bombsDiffused')
$bombsDiffused.hide()
let $bombsActive = $('#bombsActive')
$bombsActive.hide()

//functionality of return home button
$returnHomeButton.click(() => {
    // at home, gameboard is hidden and all of the action buttons/items
    $gameBoardSection.hide()
    $returnHomeButton.hide()
    $flagOnButton.hide()
    $flagOffButton.hide()
    $resetButton.hide()
    // start button with gif fades in at home screen
    $startButton.fadeIn()
    // changing h1 back to title
    $h1.html('Mine Sweeper Extreme!')
    $bombsDiffused.hide()
    $bombsActive.hide()
    // switching reset button color back to original green color
    $resetButton.css({"backgroundColor": "green"})
    // making sure win and home screens are hidden to prevent bugs
    $winHomeScreen.hide()
    $lossHomeScreen.hide()
})

//start button event function (buttons fading in and out) sets booleans to live mines, intact bombs, no diffused
$startButton.click(() => {
    // showing the reset button and changing text to 'start new game'
    $resetButton.fadeIn();
    $resetButton.html('Start New Game')
    // changin h1 text to direct user to click the start game button to start game/reset board
    $h1.html('Click Start Game to Start!')
    // making sure flag on is shown, flag off is hidden
    $flagOnButton.fadeIn()
    $flagOffButton.hide()
    // hiding start button (button with gif) and showing the game board container
    $startButton.hide();
    $gameBoardSection.fadeIn()
    // setting booleans here (similar boolean set up to reset below)
    minesAreLive = true;
    bombExplode = true;
    bombsDiffused = false;
    // making sure proper return home button is shown (not win/lose pages)
    $returnHomeButton.show()
    $winHomeScreen.hide()
    $lossHomeScreen.hide()
})



//new functions for reset button with new randomization
// randomized board adapted from Traversy Media: https://www.youtube.com/watch?v=W0No1JDc6vE&t=71s

$resetButton.click(() =>{

    //making sure flag on is shown, flag off is hidden
    $flagOnButton.fadeIn()
    $flagOffButton.hide()
    // setting reset button text to reset, and changing background to red (if click this, starts over game)
    $resetButton.html('Reset')
    $resetButton.css({"backgroundColor" : "red"})
    // switching header text to direct user to diffuse the mines
    $h1.html('Diffuse All of The Mines!!!')
    // showing the bombs diffused/active counts at the bottom
    $bombsDiffused.show()
    $bombsActive.show()

    // resetting booleans to live mines, intact and no diffused
    minesAreLive = true;
    bombExplode = false;
    bombsDiffused = false;

    // emptying the diffused bomb array
    diffusedBombArray = [];

    //setting inner html of counters to be # of bombs and # of diffused
    $bombsDiffused.html(`Diffused Bombs: ${diffusedBombArray.length}`)
    $bombsActive.html(`Active Bombs: ${numberOfBombs}`)


// set cells with array index id's and append children to the gameBoard grid
function setCellIds () {
    for (i = 0; i < totalCellNumber; i++){
        cells[i].setAttribute('id', i);
        cellField.appendChild(cells[i])
    }
}

setCellIds()

// next want to set up bombs with function

//setting up bombs empty array and number of bombs variable (from above/global)
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
        cellField.appendChild(cells[i])
    }
}

randomizedCellClasses()


//putting numbers on the empty squares adjacent to the bombs:
//adapted from Traversy Media: https://www.youtube.com/watch?v=W0No1JDc6vE&t=71s
function settingAdjacentNumbers (){

 for (i = 0; i < totalCellNumber; i++){

    // setting incrementing # of adjacent bomb variables to 0
    let numberAdjacentBombs = 0;
    // if the modulus of the index/width = 0, then the index/cell is on the left side 
    // ie modulus of 0/8 = 0, 8/8 = 0,  16/8 = 0 ... (remember index is one less than "counted" numbers ie width)
    const onLeftEdge = (i % width === 0)
    const onRightEdge = (i % width === (width - 1))

    if (cells[i].classList.contains('empty')){

        //need 8 total conditions to check bombs, also bombs can't be beyond the sides

        //checking bombs above 
        //checking bomb to the left
        if (i > 0 && !onLeftEdge && cells[i - 1].classList.contains('bomb')){ numberAdjacentBombs++}
        //checking for bomb up and to the right
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
        cells[i].style.color = 'black'
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
            cells[i].style.color = 'rgb(94, 94, 174)'
          
        }
    }
}

settingEmptyCells()


//hiding everything at reset

function hideSquares () {
    for (i = 0; i < totalCellNumber; i++){
        cells[i].classList.add('hidden');
        cells[i].classList.remove('bomb')
        cellField.appendChild(cells[i])
    }
}

hideSquares()


// flag button functionality
// put flag button function within reset button function so flag can't be used if game isn't running

$flagOnButton.click(() => {
    
    // sets mines alive bool to false so can manipulate bomb squares with flag
    minesAreLive = false

    // *safe mode is activated text is only active if game is in play (solved a header text bug)
    if (bombExplode !== true && bombsDiffused !== true && totalCellNumber !== 0){
        $h1.html('Safe Mode Activated!')
    }
    
    // hides the flag on button, shows flag off button
    $flagOnButton.hide()
    $flagOffButton.show()

    // if click a cell with flag, reverts back to original state with flag on button showing
    // resets mines live bool to true
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            $flagOffButton.hide()
            $flagOnButton.show()
            minesAreLive = true
        })
    })

    // if click flag off (deactivate flag) button, reverts back to original state with flag on button showing
    // resets mines live bool to true
    $flagOffButton.click(() => {
        $h1.html('Diffuse All of The Mines!!!')
        $flagOffButton.hide()
        $flagOnButton.show()
        minesAreLive = true
    })
})

}) // end of reset buttion functionality

// cell click functionality (based off of tic tac toe functionality)

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        $h1.html('Diffuse All of The Mines!!!')
        // if game is over or game is not active (original html '0' in divs) h1 tells user to start or reset the game
        if (bombExplode === true || bombsDiffused === true || totalCellNumber === 0) {
            $h1.html('Please Start or Reset Game')
        } 
        //returns out of function if cell with bomb is already diffused
        else if (cell.classList.contains('diffused')){
            return;
        }
        //returns out of function if cell is already revealed
        else if (cell.classList.contains('revealed')){
            return;
        }
        // conditionals if game remains active
        else {
            // conditionals if the user hits a bomb
            if (cell.innerHTML === 'bomb') {
                // if mines are live, bomb explode = true and user loses
                if (minesAreLive === true) {
                    // changes bomb explode conditional to true
                    bombExplode = true;
                    // add class list of bomb to cell (with bomb image)
                    cell.classList.add('bomb')

                    //resetting reset button after loss
                    $resetButton.html('Start Game')
                    $resetButton.css({"backgroundColor" : "green"})
                    // h1 tells player game is over and to click on reset/start new game
                    $h1.html('Game Over! Click Start Game to Try Again!')

                    //showing all cell elements with 'bomb' inner HTML after lose
                    for (i = 0; i < totalCellNumber; i++){
                        if (cells[i].innerHTML === 'bomb'){
                            cells[i].classList.add('bomb')
                        }
                    }
                    // shows the loss screen (return home button) after 1 sec  
                    setTimeout(() => {
                    // shows loss home screen, hides everything else
                        $lossHomeScreen.show()
                        $gameBoardSection.hide()
                        $returnHomeButton.hide()
                        $flagOnButton.hide()
                        $flagOffButton.hide()
                        $resetButton.hide()
                        $bombsDiffused.hide()
                        $bombsActive.hide()

                    //functionality of win home screen is same as return home button
                    $lossHomeScreen.click(() => {
                        $startButton.fadeIn()
                        $h1.html('Mine Sweeper Extreme!')
                        $resetButton.css({"backgroundColor": "green"})
                        $lossHomeScreen.hide()
                    })
                    }, 1000)

                }
                // conditional if user hits a bomb with diffuse/flag/safemode on
                else {
                    // sets mines are live back to true
                    minesAreLive = true
                    // adds diffused class
                    cell.classList.add('diffused')
                    // gets the id of the diffused bomb and pushes that id into an array
                    let diffusedBombID = cell.getAttribute('id')
                    diffusedBombArray.push(diffusedBombID)
                    // changes the inner html to diffused (hidden with css font)
                    let bombText = cell.innerHTML
                    bombText = 'Diffused'
                    cell.innerHTML = bombText

                    // change counters to effectively subtract 1 from active bombs, add 1 to diffused bombs via array length
                    $bombsDiffused.html(`Diffused Bombs: ${diffusedBombArray.length}`)
                    $bombsActive.html(`Active Bombs: ${numberOfBombs - diffusedBombArray.length}`)

                    // on route to win condition:
                    if (diffusedBombArray.length !== numberOfBombs){
                        // h1 shows the number of active bombs remaining with encouraging message
                        $h1.html(`Good job!! Keep looking! There are ${numberOfBombs - diffusedBombArray.length} left!!`)
                    }
                    // win condition if the diffused bomb array length = total number of bombs
                    else if (diffusedBombArray.length === numberOfBombs){
                        // bombs diffused (win condition) is true and the game is over
                        bombsDiffused = true
                        // header shows 'you win!'
                        $h1.html('You Win!!!')

                        // shows the loss screen (return home button) after 2 secs  
                        setTimeout(() => {
                            // shows win home screen, hides everything else
                            $winHomeScreen.show()
                            $gameBoardSection.hide()
                            $returnHomeButton.hide()
                            $flagOnButton.hide()
                            $flagOffButton.hide()
                            $resetButton.hide()
                            $bombsDiffused.hide()
                            $bombsActive.hide()

                        //functionality of win home screen is same as return home button
                        $winHomeScreen.click(() => {
                            $startButton.fadeIn()
                            $h1.html('Mine Sweeper Extreme!')
                            $resetButton.css({"backgroundColor": "green"})
                            $winHomeScreen.hide()
                        })
                    }, 2000)
                    }
                }
            }
            // conditional if hit a number with expanded click or off click (not empty or not bomb cell)
            else if (cell.innerHTML !== 'empty' && cell.innerHTML !== 'bomb' ) {
                // just reveals that # square and returns out of click function
                cell.classList.add('revealed') 
                return
            }

            // empty square expansion
            else if (cell.innerHTML === 'empty') {
                let cellID = cell.id

                // function to reveal empty squares:
                // adapted from Traversy Media: https://www.youtube.com/watch?v=W0No1JDc6vE&t=71s

                const onLeftEdge = (cellID % width === 0)
                // ie if width is 8, and id is 7, modulus would be 8 - 1= 7 in that case if cell is on right edge
                const onRightEdge = (cellID % width === width - 1)

                // want to put in set timeout to happen slightly after the click
                setTimeout(() => {
                    //looking at cell to the left of clicked
                    if (cellID>0 && !onLeftEdge){
                        //getting new id from cell to the left, using parse int to make sure ID is integer
                        const newID = cells[parseInt(cellID) - 1].id 
                        // grabbing the new cell to the left of current cellID
                        const newCell = document.getElementById(newID)
                        //putting the newCell through the click function
                        newCell.click()
                    }
                    // upper right adjacent cell
                    if (cellID > (width - 1) && !onRightEdge){
                        // getting new id from cell to upper right
                        const newID = cells[parseInt(cellID) + 1 - width].id 
                        // grabbing the cell with the new ID
                        const newCell = document.getElementById(newID)
                        // putting new cell through click
                        newCell.click()
                    }
                    // cell just above current cell
                    if (cellID > width){
                        // getting new ID from cell just above current cell
                        const newID = cells[parseInt(cellID) - width].id 
                        // grabbing the cell with the new ID
                        const newCell = document.getElementById(newID)
                        // sending new cell through click function 
                        newCell.click()
                    }
                    // cell to the upper left adjacent cell
                    if (cellID > (width + 1) && !onLeftEdge){
                        // getting new id from cell to upper left
                        const newID = cells[parseInt(cellID) - (width+1)].id 
                        // grabbing cell with the upper left id
                        const newCell = document.getElementById(newID)
                        // sending new cell through the click function
                        newCell.click()
                    }
                    // cell to the right of current cell
                    if (cellID < (totalCellNumber - 2) && !onRightEdge){
                        // finding cell id to the right of the current cell
                        const newID = cells[parseInt(cellID)+1].id 
                        // grabbing cell with new ID and sending through click function
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    //cell to the lower left of current ID cell
                    if (cellID < (totalCellNumber - width) && !onLeftEdge) {
                        // finding cell id to the lower left of the current cell
                        const newID = cells[parseInt(cellID) + width-1].id
                        // grabbing that cell and sending through click function
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    //cell to the lower right of the current ID cell
                    if (cellID < (totalCellNumber - width - 2) && !onRightEdge) {
                        // finding id of cell above and to the right
                        const newID = cells[parseInt(cellID)  + width + 1].id
                        // grabbing that cell by its id and senting through click function
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    // cell just below the current cell ID
                    if (cellID < (totalCellNumber - width - 1)) {
                        // getting the id of the cell just below the current cell
                        const newID = cells[parseInt(cellID) + width].id
                        // grabbing cell with that id and sending it through the click function
                        const newCell = document.getElementById(newID)
                        newCell.click()
                    }
                    }, 10)
                // revealing the expanding empty clicked squares by adding revealed class
               cell.classList.add('revealed') 
               
            }
        } 

    })
})