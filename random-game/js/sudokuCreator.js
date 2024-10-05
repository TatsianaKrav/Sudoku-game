import { GRID_SIZE, BOX_SIZE, shuffle } from "./utilities.js";

export function createSudoku() {
    const sudoku = createGrid();
    fillGrid(sudoku);
    return clearCells(sudoku);
}


//create empty grid 9x9
function createGrid() {
    return new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(null));
}


function fillGrid(grid) {

    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true;

    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < numbers.length; i++) {
        const val = numbers[i];
        const isValid = checkCell(emptyCell.row, emptyCell.column, grid, val);

        if (isValid) {
            grid[emptyCell.row][emptyCell.column] = val;
            if (fillGrid(grid)) return grid; //step to another empty cell until all cells are filled
        } else {
            grid[emptyCell.row][emptyCell.column] = null; //make the same cell null to continue numbers loop
        }
    }
}

export function findEmptyCell(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let column = 0; column < GRID_SIZE; column++) {
            if (grid[row][column] === null) return { row, column };
        }
    }
    return null;
}

function checkCell(row, column, grid, value) {
    return checkRow(row, grid, value) && checkColumn(column, grid, value) &&
        checkBox(row, column, grid, value);
}


function checkRow(row, grid, value) {
    return grid[row].every(item => item !== value);
}

function checkColumn(column, grid, value) {
    for (let i = 0; i < GRID_SIZE; i++) {
        if (grid[i][column] === value) return false;
    }
    return true;
}

function checkBox(row, column, grid, value) {
    const rowInBox = Math.trunc(row / BOX_SIZE) * BOX_SIZE;
    const columnInBox = Math.trunc(column / BOX_SIZE) * BOX_SIZE;

    for (let i = rowInBox; i < rowInBox + BOX_SIZE; i++) {
        for (let j = columnInBox; j < columnInBox + BOX_SIZE; j++) {
            if (grid[i][j] === value) return false;
        }
    }

    return true;
}

function clearCells(grid) {
    const clearedGrid = [...grid].map(row => [...row]); // copy to have 2 grid: filled and cleared
    let amountToClear = 3;

    while (amountToClear > 0) {
        const rowRandom = Math.floor(Math.random() * 8);
        const columnRandom = Math.floor(Math.random() * 8);

        if (clearedGrid[rowRandom][columnRandom] !== null) {
            clearedGrid[rowRandom][columnRandom] = null;
            amountToClear--;
        }
    }

    return { filledGrid: grid, clearedGrid: clearedGrid };
}