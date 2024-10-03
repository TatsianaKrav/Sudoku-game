import { Sudoku } from "./sudoku.js";
import { GRID_SIZE, createElement, getRowAndColumnIndex } from "./utilities.js";


const sudoku = new Sudoku();
let focusedCell = null;


init();
numbersHandler();

function init() {
    renderCells();
}

function renderCells() {
    const grid = document.querySelector('.grid');

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = createElement('div', 'cell');
        grid.append(cell);

        const row = getRowAndColumnIndex(i).rowIndex;
        const column = getRowAndColumnIndex(i).columnIndex;

        if (sudoku.grid.clearedGrid[row][column] !== null) {
            cell.innerText = sudoku.grid.clearedGrid[row][column];
            cell.classList.add('numbered');
        } else continue;
    }
}


function numbersHandler() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.onclick = (e) => {
            console.log(e.target.innerText);
        }
    })
}