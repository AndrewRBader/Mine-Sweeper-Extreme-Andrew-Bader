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
let resetButton = document.querySelector('#resetButton')
// console.log(resetButton)

resetButton.addEventListener('click', () => {
    $hiddenCells.removeClass('revealed bomb diffused').fadeIn()
})

// initial state, removes all "activity" classes from hidden cells and show just hidden cells
// Note** this removes classes from all other element class node lists that are related as well

$hiddenCells.removeClass('revealed bomb diffused').fadeIn()

//adding back some revealed to work on win conditions/cell click function

// $hiddenCells.addClass('revealed').fadeIn()


// using forEach array method to add event listener to each cell
//also using vanilla JS for event listeners/clicks cause my vs code doesnt like functions ie .click

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerHTML === 'Bomb') {
            cell.classList.add('revealed')

            // Console logs to play in console
            console.log('You Lose! Game Over!')
            console.log(cell)
        }
        else if (parseInt(cell.innerHTML) > 0 && parseInt(cell.innerHTML) <= 2) { 
            cell.classList.add('revealed')

            // Console logs to play in console
            console.log(`${cell.innerHTML} bombs are close`)
            console.log(cell)
        }
        else if (parseInt(cell.innerHTML) === 0){
            cell.classList.add('revealed')

            // Console logs to play in console
            console.log('no bombs are near')
            console.log(cell)

            //find coordinates of click
            const colClick = parseInt(cell.getAttribute('id').split('-').slice(3))
            console.log(colClick)
            const rowClick = parseInt(cell.getAttribute('id').split('-').slice(1,2))
            console.log(rowClick)
            const clickCoordinates = [colClick, rowClick];
            console.log(clickCoordinates)
            
            //function to get cells in column of clicked empty square
            let cellCoordinatesInClickedColumn = [];
            for (i = 0; i<cells.length ;i++) {
                if (cellCoordinateArray[i][0] === colClick){
                    cellCoordinatesInClickedColumn.push(cellCoordinateArray[i])
                    if (cellCoordinateArray[i][2] !== 'Bomb'){
                        cells[i].classList.add('revealed')
                    }
                }
                
            }console.log(cellCoordinatesInClickedColumn)

            //function to get cells in row of clicked empty square
            let cellCoordinatesInClickedRow = [];
            for (i = 0; i<cells.length ;i++) {
                if (cellCoordinateArray[i][1] === rowClick){
                    cellCoordinatesInClickedRow.push(cellCoordinateArray[i])
                    if (cellCoordinateArray[i][2] !== 'Bomb'){
                        cells[i].classList.add('revealed')
                    }
                }
                
            }console.log(cellCoordinatesInClickedRow)
        }
    })
})




// function that gives coordinates for all cells in gameboard:
let cellCoordinateArray = [];

function coordinatesFromIDGeneration () {
    for (i = 0; i<cells.length; i++){
        const col = parseInt(cells[i].getAttribute('id').split('-').slice(3))
        const row = parseInt(cells[i].getAttribute('id').split('-').slice(1,2))
        cellCoordinateArray.push([col, row, cells[i].innerHTML])
    }
    return cellCoordinateArray
}

coordinatesFromIDGeneration()
console.log(cellCoordinateArray)










// thoughts:
//can I create a game board object? or a cell object with the content?





