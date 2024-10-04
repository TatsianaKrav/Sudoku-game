import { Sudoku } from "./sudoku.js";
import { GRID_SIZE, createElement, getRowAndColumnIndex } from "./utilities.js";


const sudoku = new Sudoku();
let focusedCell = null;


init();
numbersHandler();
cellsHandler();
removeCell();

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
            cell.classList.add('default');
        } else continue;
    }
}

//add with keyboard
function numbersHandler() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.onclick = (e) => {
            if (focusedCell && !focusedCell.classList.contains('numbered')) {
                focusedCell.innerText = e.target.innerText;
                focusedCell.classList.add('numbered');

               /*  console.log(sudoku.hasEmptyCell()); */

               /*  if (!sudoku.grid.hasEmptyCell) {
                    finishGame();
                } */
            }
        }
    })
}

function cellsHandler() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {

        cell.onclick = (e) => {
            cells.forEach(cell => cell.classList.remove('focused'));
            focusedCell = e.target;
            e.target.classList.add('focused');

        }
    })
}

//add remove with backspace
function removeCell() {
    const removeBtn = document.querySelector('.remove');
    removeBtn.onclick = () => {
        if (focusedCell && focusedCell.classList.contains('numbered') && !focusedCell.classList.contains('default')) {
            focusedCell.classList.remove('numbered');
            focusedCell.innerText = '';
            focusedCell = null;
        }
    }
}

function finishGame() {
    let isCorrect = checkResult();

    const popup = document.querySelector('.popup');
    const popupMessage = document.querySelector('.popup-message');
    popup.classList.toggle('active');

    popupMessage.innerText = isCorrect ? 'Congraliations!' : "You lost";
}

function checkResult() {
    const initialGrid = sudoku.grid.filledGrid.flat();
    const cells = document.querySelectorAll('.cell');
    let filledGrid = Array.from(cells).map(cell => +cell.innerText);

    return JSON.stringify(initialGrid) === JSON.stringify(filledGrid);
}