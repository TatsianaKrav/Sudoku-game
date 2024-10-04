import { Sudoku } from "./sudoku.js";
import { GRID_SIZE, createElement, getRowAndColumnIndex } from "./utilities.js";

startGame();

function startGame() {
    const sudoku = new Sudoku();
    let focusedCell = null;
    let focusedCellIndex;

    init();

    function init() {
        renderCells();
        setCellFocused();
        removeCell();
        cellsValueHandler();
        nextGame();
        showErrors();
        showSolution();
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

    function cellsValueHandler() {
        const numbers = document.querySelectorAll('.number');
        numbers.forEach(number => {
            number.addEventListener('click', (e) => {
                const value = e.target.innerText;

                if (focusedCell && !focusedCell.classList.contains('numbered')) {
                    setCellValue(value);
                }
            })
        })

        window.addEventListener('keydown', (e) => {
            const value = e.key;

            if (focusedCell && !focusedCell.classList.contains('numbered') && Number.isInteger(+value)) {
                setCellValue(value);
            }
        })
    }

    function setCellValue(val) {
        focusedCell.innerText = val;
        focusedCell.classList.add('numbered');

        const row = getRowAndColumnIndex(focusedCellIndex).rowIndex;
        const column = getRowAndColumnIndex(focusedCellIndex).columnIndex;
        sudoku.grid.clearedGrid[row][column] = +val;


        if (!sudoku.hasEmptyCell()) {
            finishGame();
        }
    }

    function setCellFocused() {
        const cells = document.querySelectorAll('.cell');

        cells.forEach((cell, index) => {
            cell.onclick = (e) => {
                cells.forEach(cell => {
                    cell.classList.remove('focused');
                    cell.classList.remove('error');
                });

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
            /*   focusedCell = null; */

            const row = getRowAndColumnIndex(focusedCellIndex).rowIndex;
            const column = getRowAndColumnIndex(focusedCellIndex).columnIndex;
            sudoku.grid.clearedGrid[row][column] = null;

            /*  focusedCellIndex = null; */
        }
    }

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

    function nextGame() {
        const popupNextBtn = document.querySelector('.popup-next');
        const nextBtn = document.querySelector('.next');

        popupNextBtn.addEventListener('click', restartGame);
        nextBtn.addEventListener('click', restartGame);
    }

    function restartGame() {
        const popup = document.querySelector('.popup');
        popup.classList.toggle('active');

        const grid = document.querySelector('.grid');
        grid.innerHTML = '';

        startGame();
    }

    function showErrors() {
        const errorsBtn = document.querySelector('.errors');
        const cells = document.querySelectorAll('.cell');
        const initialGrid = sudoku.grid.filledGrid.flat();

        errorsBtn.onclick = () => {
            for (let i = 0; i < initialGrid.length; i++) {
                if ((initialGrid[i] !== +cells[i].innerText) && cells[i].innerText !== '') {
                    cells[i].classList.add('error');
                }
            }
        }
    }

    function showSolution() {
        const solutionBtn = document.querySelector('.solution');
        const cells = document.querySelectorAll('.cell');
        const initialGrid = sudoku.grid.filledGrid.flat();

        solutionBtn.onclick = () => {
            for (let i = 0; i < initialGrid.length; i++) {
                if (initialGrid[i] !== +cells[i].innerText) {
                    cells[i].innerText = initialGrid[i];
                    cells[i].classList.add('numbered');
                }
            }
        }

    }
};
