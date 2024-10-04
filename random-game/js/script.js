import { Sudoku } from "./sudoku.js";
import { GRID_SIZE, createElement, getRowAndColumnIndex } from "./utilities.js";


const sudoku = new Sudoku();
let focusedCell = null;
let focusedCellIndex;


init();


function init() {
    renderCells();
    numbersHandler();
    cellsHandler();
    removeCell();
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

                const row = getRowAndColumnIndex(focusedCellIndex).rowIndex;
                const column = getRowAndColumnIndex(focusedCellIndex).columnIndex;
                sudoku.grid.clearedGrid[row][column] = +e.target.innerText;


                if (!sudoku.hasEmptyCell()) {
                    finishGame();
                }
            }
        }
    })
}

function cellsHandler() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {

        cell.onclick = (e) => {
            cells.forEach(cell => cell.classList.remove('focused'));
            focusedCell = e.target;
            focusedCellIndex = index;
            e.target.classList.add('focused');

        }
    })
}

function clearCell() {
    if (focusedCell && focusedCell.classList.contains('numbered') && !focusedCell.classList.contains('default')) {
        focusedCell.classList.remove('numbered');
        focusedCell.innerText = '';
        focusedCell = null;
    }
}

//delete from grid
function removeCell() {
    const removeBtn = document.querySelector('.remove');

    window.addEventListener('keydown', (e) => {
        if (e.key === "Backspace") {
            clearCell();
        }
    })

    removeBtn.addEventListener('click', clearCell);
}

function finishGame() {
    let isCorrect = checkResult();

    const popup = document.querySelector('.popup');
    const popupMessage = document.querySelector('.popup-message');
    popup.classList.toggle('active');

    popupMessage.innerText = isCorrect ? 'Congratilations!' : "You lost";
}

function checkResult() {
    const initialGrid = sudoku.grid.filledGrid.flat();
    const filledGrid = sudoku.grid.clearedGrid.flat();
    return JSON.stringify(initialGrid) === JSON.stringify(filledGrid);
}