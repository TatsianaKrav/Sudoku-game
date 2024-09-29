import { GRID_SIZE, shuffle } from "./utilities.js";

export function createSudoku() {
    const sudoku = createGrid();
    console.log(sudoku);
}


//create empty grid 9x9
function createGrid() {
    const matrix = new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(null));
    fillGrid(matrix);
    return matrix;
}


function fillGrid(grid) {

    for (let row = 0; row < GRID_SIZE; row++) {

        for (let column = 0; column < GRID_SIZE; column++) {
            const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            let index = 0;

            while (grid[row][column] === null) {
                const isValid = checkCell(row, column, grid, numbers[index]);

                if (isValid) {
                    grid[row][column] = numbers[index];
                }
                index++;
            }



            /*  while (isEmpty) {
                 index = index === numbers.length - 1 ? 0 : index;
                 const isValid = checkCell(row, column, grid, numbers[index]);
 
                 if (isValid) {
                     grid[row][column] = numbers[index];
                     isEmpty = false;
                 } else {
                     index++;
                     isEmpty = true;
                 }
             } */
        }
    }

    return grid;
}

function checkCell(row, column, grid, value) {
    return checkRow(row, grid, value) && checkColumn() && checkBox();
    /*     return true; */
}


function checkRow(row, grid, value) {
    return grid[row].every(item => item !== value);
}

function checkColumn(column, grid, value) {
    /*   return grid[column].every(item => item !== value); */
    return true;
}

function checkBox() {
    return true;
}