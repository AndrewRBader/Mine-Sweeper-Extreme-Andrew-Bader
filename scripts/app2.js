
const cells = document.querySelectorAll('.cell')
console.log(cells)


cells.forEach(cell => {
    cell.addEventListener('click', () => {

    let cellID = cell.id
    console.log(cellID)

    let currentCell = document.getElementById(cellID)
    
    console.log(currentCell)

    


    })
})
