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



//global column index variable for expanded row column function and for loop in blank cell click

let columnRowIndex = null;

// function that gives coordinates for all cells in gameboard:
let cellCoordinateArray = [];

//global row children element number for row length
let rowChildrenElementNumber = null;



cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerHTML === 'Bomb') {
            cell.classList.add('revealed')

            // Console logs to play in console
            console.log('You Lose! Game Over!')
            alert('You Lose! Game Over!!')
            // console.log(cell)
        }
        else if (parseInt(cell.innerHTML) > 0 && parseInt(cell.innerHTML) <= 2) { 
            cell.classList.add('revealed')

            // Console logs to play in console
            console.log(`${cell.innerHTML} bombs are close`)
            // console.log(cell)
        }
        else if (parseInt(cell.innerHTML) === 0){
            cell.classList.add('revealed')

            // Console logs to play in console
            // console.log('no bombs are near')
            // console.log(cell)

            //find coordinates of click
            const colClick = parseInt(cell.getAttribute('id').split('-').slice(3))
            // console.log(colClick)
            const rowClick = parseInt(cell.getAttribute('id').split('-').slice(1,2))
            // console.log(rowClick)
            const clickCoordinates = [colClick, rowClick];
            // console.log(clickCoordinates)
            
            //function to get cells in column of clicked empty square
            let blankCellCoordinatesInClickedColumn = [];
            let blankCellCoordinatesInClickedRow =[];
            let rowChildrenElementNumber = 0;
            // console.log(rowChildrenElementNumber)




            for (i = 0; i<cells.length ;i++) {
                //collects just blank columns (no bombs in array)
                if (cellCoordinateArray[i][0] === colClick && cellCoordinateArray[i][2] !== 'Bomb'){
                    blankCellCoordinatesInClickedColumn.push(cellCoordinateArray[i])
                    cells[i].classList.add('revealed')

                    //getting rows off of columns to reveal through parent Node
                    let parentNode = cells[i].parentElement
                    // console.log(parentNode)
                    let childrenOfRowNode = parentNode.children
                    // console.log(childrenOfRowNode)
                    // console.log(childrenOfRowNode.length)
                    rowChildrenElementNumber = childrenOfRowNode.length

                    for (j = 0 ; j < childrenOfRowNode.length; j++){
                        // console.log(childrenOfRowNode[j])
                        if (childrenOfRowNode[j].innerHTML !== 'Bomb'){
                            // childrenOfRowNode[j].classList.add('revealed')
                        }
                    }
                    
                }
            }

            console.log(blankCellCoordinatesInClickedColumn)

            for (i = 0; i<cells.length ;i++) {
                //collects just blank cells with no bombs
                if (cellCoordinateArray[i][1] === rowClick && cellCoordinateArray[i][2] !== 'Bomb'){
                    blankCellCoordinatesInClickedRow.push(cellCoordinateArray[i])
                    cells[i].classList.add('revealed')

                    // need loop here that goes through columns, since parents are rows, can't use that trick
                    //length of column = (length of cells array)/childrenOfRowNode.length
                    let lengthOfColumn = cells.length/rowChildrenElementNumber
                    // console.log(lengthOfColumn)

                    // loop through column off of each row and reveal till bomb
                    

                } 
                
            }
            
            
            console.log(blankCellCoordinatesInClickedRow)

             
           

            //might need an else if === bomb break loop for bombs in center here

           

        }
    })
})






function coordinatesFromIDGeneration () {
    for (i = 0; i<cells.length; i++){
        const col = parseInt(cells[i].getAttribute('id').split('-').slice(3))
        const row = parseInt(cells[i].getAttribute('id').split('-').slice(1,2))
        cellCoordinateArray.push([col, row, cells[i].innerHTML])
    }
    return cellCoordinateArray
}

coordinatesFromIDGeneration()
// console.log(cellCoordinateArray)











// thoughts:
//can I create a game board object? or a cell object with the content?





