
const cells = document.querySelectorAll('.cell')


cells.forEach(cell => {
    cell.addEventListener('click', () => {

    let cellID = cell.id
    console.log(cellID)

    let col = parseInt(cellID.split('-').slice(3))
    let row = parseInt(cellID.split('-').slice(1,2))
    let coordinates = {x: col, y: row};
    console.log(coordinates) 

    let currentCell = document.getElementById(cellID)
    console.log(currentCell)
    
    currentCell.classList.add('revealed')
    console.log(currentCell.classList.contains("revealed"))
   

    let newCoordinates = {xNew: coordinates.x + 1, yNew: coordinates.y}
    let newID = `row-${newCoordinates.xNew}-index-${newCoordinates.yNew}`

    currentCell.id = newID
    console.log(currentCell)

    if (currentCell.classList.contains("revealed")) {
        return
    }
    else {
        
        let nextCell = document.getElementById(newID)
        
       
    }


  

    


    })
})
