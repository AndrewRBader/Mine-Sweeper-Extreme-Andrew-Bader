
//check that renaming account didnt screw up repo

// js link check
// console.log('hello front end')

//Global Variables
// collecting all cells in a variable
const cells = document.querySelectorAll('.cell')
// console.log($cells)
// console.log($cells.length)

// collecting hidden cells (starting) in variable
let $hiddenCells = $('.hidden');
// console.log($hiddenCells)
// console.log($hiddenCells.length)


// collecting revealed cells (with black text) in variable
let $revealedCells = $('.revealed');
// console.log($revealedCells)
// console.log($revealedCells.length)

// collecting bomb cells in a variable
let $bombCells = $('.bomb');
// console.log($bombCells)
// console.log($bombCells.length)

//collecting diffused cells in a variable
let $diffusedCells = $('.diffused');
// console.log($diffusedCells);
// console.log($diffusedCells.length);

// collecting buttons into variable (vanilla JS to avoid click function)
let $resetButton = $('#resetButton')
// console.log(resetButton)

let $startButton = $('#startButton')
// console.log($startButton)



$hiddenCells.removeClass('revealed bomb diffused').fadeIn()

//mines are live boolean for active game, bomb explode, bombs diffused 
let minesAreLive = false;
let bombExplode = true;
let bombsDiffused = false;

//flag button
let $flagOnButton = $('#flagOnButton');
// console.log(flagOnButton)
let $flagOffButton = $('#flagOffButton');
// console.log(flagOffButton)
$flagOnButton.hide()
$flagOffButton.hide()
$resetButton.hide()

//start button event function
$startButton.click(() => {
    $hiddenCells.removeClass('revealed bomb diffused').fadeIn()
    $resetButton.fadeIn();
    $flagOnButton.fadeIn()
    $startButton.hide();
    minesAreLive = true;
    bombExplode = false;
    bombsDiffused = false;
})


//# of bombs


let numberBombs = $bombCells.length
// console.log(numberBombs)

//diffused bomb array

let diffusedBombArray = [];

//reset button: press to activate Flag button empties diffusedBombArray

$resetButton.click(() =>{
    $hiddenCells.removeClass('revealed bomb diffused').fadeIn()
    minesAreLive = true;
    bombExplode = false;
    bombsDiffused = false;
    // console.log('Mines Are Live')

    // resets diffused bombs that are collected before reset
    for (i = 0; i<diffusedBombArray.length;i++){
        let cellID = diffusedBombArray[i]
        // console.log(cellID)
        for (j = 0; j < cells.length; j++){
            let cellsArrayElementID = cells[j].id;
            // console.log(cellsArrayElementID)
            if (cellsArrayElementID === cellID){
                cells[j].innerHTML = 'Bomb'
            }
            
        }
    }

    //empties diffused bomb array
    diffusedBombArray = []

})



//Flag/diffuser functionality:

//set up bomb to be initially without diffused class, will change with flag added


$flagOnButton.click(() => {

    minesAreLive = false
    // console.log('Safety Gear On')

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
        // console.log('Safety Gear Removed')
        $flagOffButton.hide()
        $flagOnButton.fadeIn()
        minesAreLive = true
    })
})



// using forEach array method to add event listener to each cell
//also using vanilla JS for event listeners/clicks cause my vs code doesnt like functions ie .click

//need cell ID var for functions and event listener
let cellID = null;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (bombExplode === true || bombsDiffused === true) {
            // console.log('Reset Game!')
            alert('Please Start or Reset Game')
        } 
        //returns out of function if cell with bomb is already diffused
        else if (cell.classList.contains('diffused')){
            console.log('already diffused')
            return;
        }
        //returns out of function if cell is already revealed
        else if (cell.classList.contains('revealed')){
            console.log('already revealed')
            return;
        }
        else {
            if (cell.innerHTML === 'Bomb') {
            
                // console.log('You found a bomb')

                if (minesAreLive === true) {
                    bombExplode = true;
                    cell.classList.add('bomb')

                     // alert to see loss in browser
                     // console.log('You Lose! Game Over!')
                     alert('You Lose! Game Over!!')

                }

                //check win function is fully for the Flag On button, last flag placed on bomb results in win
            
                else {
                    minesAreLive = true
                    // console.log('You diffused a bomb')
                    cell.classList.add('diffused')
                    let diffusedBombID = cell.getAttribute('id')
                    // console.log(diffusedBombID)
                    diffusedBombArray.push(diffusedBombID)
                    // console.log(diffusedBombArray)
                    // console.log('Safety Gear Removed')

                    //remove bomb html from cell so can't add twice!
                    //diffused bomb area is also safe!
                    // console.log (cell.innerHTML)
                    let bombText = cell.innerHTML
                    bombText = 'Diffused Bomb'
                    cell.innerHTML = bombText
                    // console.log (cell.innerHTML)

                    // dont need loop just do conditional!
                    if (diffusedBombArray.length !== numberBombs){
                        // console.log(`Keep looking! There are ${numberBombs - diffusedBombArray.length} left!!`)
                    }
                    else if (diffusedBombArray.length === numberBombs){
                        //for browser and console win check
                        bombsDiffused = true;
                        // console.log ('You Win!!!')
                        alert('You Win!!!')
                    }
                }
            }
            else if (parseInt(cell.innerHTML) !== 0) { 

                // Console logs to play in console
                console.log(`${cell.innerHTML} bombs are close`)
                // console.log(cell)
            }


            else {


                cellID = cell.getAttribute('id')
                console.log(coordinatesFromID(cellID))
                
                revealedCellLocation(cell, cellID)


            
               
            }
            cell.classList.add('revealed')
        } //for overall else after if bomb explode = false
    })
})
                





// gameboard analysis functions

// will need bool that is true for custom that shuts of width and height from html board

// getting width and height from hard coded board

let boardWidthHeight = {};

function widthAndHeightFromHTML () {
    let heightHTML = document.querySelectorAll('.row').length
    let widthHTML = document.querySelectorAll('.cell').length/heightHTML
    boardWidthHeight = {height: heightHTML, width: widthHTML}
    return boardWidthHeight
}

//calling width and height from html for now
console.log(widthAndHeightFromHTML())


// coordinates from ID function
let coordinates = {};

function coordinatesFromID (cellID) {
    const col = parseInt(cellID.split('-').slice(3,4))
    const row = parseInt(cellID.split('-').slice(1,2))
    coordinates = {x: col, y: row}; 
    return coordinates
}



//revealing adjacent cells ids/coordinates


function revealedCellLocation(cell, cellID){

    //if click on left click is on left
    if (coordinates.x === 0) {
        let onLeftEdge = true
        console.log('click is on left')
    }
    //if click on right click is on right
    else if ((coordinates.x+1)/boardWidthHeight.width === 1) {
        const onRightEdge = true
        console.log('click is on right')
    }
    //if click is on top row
    else if (coordinates.y === 1){
        const onTopEdge = true
        console.log('click is on top row')
    }
    //if click is on bottom row
    else if ((coordinates.y+1)/boardWidthHeight.height === 1) {
        const onBottomEdge = true
        console.log('click is on bottom')
    }

    //finding the cells element with cellID number
    const cellIdNumber = parseInt(cellID.split('-').slice(4))
    console.log(cellIdNumber)
    console.log(cells[cellIdNumber])

}









// thoughts:

// I probably want a player object!











