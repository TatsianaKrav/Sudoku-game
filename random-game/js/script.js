import { createSudoku, findEmptyCell } from "./sudokuCreator.js";
import { GRID_SIZE, createElement, createSound, getRowAndColumnIndex, addToScore, renderScoreTable } from "./utilities.js";


let sudoku = null;
let focusedCell = null;
let focusedCellIndex;
let isPrevGame = false;
let scores = [];
let timerOn = false;
let isOver = false;
let isFinished = false;
let timerId;
let min = 0;
let sec = 0;
let timer = {};
let level = { levelName: 'cross-check', levelValue: 2 };
const timerEl = document.querySelector('.timer');
const levels = document.querySelector('.levels');
const grid = document.querySelector('.grid');
const winner = document.querySelector('.winner');
const iconWrapper = document.querySelector('.icon-wrapper');

window.onload = () => {
    scores = JSON.parse(localStorage.getItem('results'));
    if (scores) {
        renderScoreTable(scores);
    }
}

init(false);

function init(val) {
    timerOn = false;
    isOver = false;
    isFinished = false;
    min = 0;
    sec = 0;

    if (winner.classList.contains('active')) {
        winner.classList.remove('active');
        iconWrapper.classList.remove('won');
    } else {
        iconWrapper.classList.remove('lost');
    }

    timerEl.innerText = '00:00';

    if (val) {
        sudoku = JSON.parse(localStorage.getItem('grid'));
    } else {
        sudoku = createSudoku(level);
    }

    localStorage.setItem('grid', JSON.stringify(sudoku));

    renderCells();
    setCellFocused();
    removeCell();
    cellsValueHandler();
    nextGame();
    showErrors();
    showSolution();
    restart();
}

levels.onchange = (e) => {
    switch (e.target.value) {
        case 'easy': level = { levelName: 'easy', levelValue: 27 };
            break;
        case 'medium': level = { levelName: 'medium', levelValue: 37 };
            break;
        case 'hard': level = { levelName: 'hard', levelValue: 50 };
            break;
        case 'cross-check': level = { levelName: 'cross-check', levelValue: 2 };
            break;
    }

    clearInterval(timerId);
    init(false);
}


function renderCells() {
    grid.innerHTML = "";

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = createElement('div', 'cell');
        grid.append(cell);

        const row = getRowAndColumnIndex(i).rowIndex;
        const column = getRowAndColumnIndex(i).columnIndex;

        if (sudoku.clearedGrid[row][column] !== null) {
            cell.innerText = sudoku.clearedGrid[row][column];
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
                const container = document.querySelector('.container');

                const fillSound = document.createElement('audio');
                fillSound.setAttribute('src', '../assets/sounds/fill.mp3');
                container.appendChild(fillSound);
                fillSound.play();
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
    sudoku.clearedGrid[row][column] = +val;


    const fillSound = createSound('assets/sounds/fill.mp3');
    fillSound.play();

    if (!findEmptyCell(sudoku.clearedGrid)) {
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

            if (!timerOn) {
                timerId = initTimer();
                timerOn = true;
            }
        }
    })
}

function clearCell() {
    if (focusedCell && focusedCell.classList.contains('numbered') && !focusedCell.classList.contains('default')) {
        focusedCell.classList.remove('numbered');
        focusedCell.innerText = '';

        const row = getRowAndColumnIndex(focusedCellIndex).rowIndex;
        const column = getRowAndColumnIndex(focusedCellIndex).columnIndex;
        sudoku.clearedGrid[row][column] = null;

        const removeSound = createSound('assets/sounds/remove.mp3');
        removeSound.play();
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
    isFinished = true;

    const popup = document.querySelector('.popup');
    const popupMessage = document.querySelector('.popup-message');
    const popupExtra = document.querySelector('.popup-extra');
    popup.classList.toggle('active');

    const winSound = createSound('assets/sounds/win2.mp3')
    const lostSound = createSound('assets/sounds/lost.mp3')

    const time = timerEl.innerText;

    if (isCorrect) {
        popupMessage.innerText = 'Congratilations!';
        popupExtra.innerText = `Your time - ${time}, level - ${level.levelName}`;
        winSound.play();
        winner.classList.add('active');
        iconWrapper.classList.add('won');
        iconWrapper.classList.remove('lost');

        addToScore(scores, 'win', time, level);

    } else {
        popupMessage.innerText = "You lost";
        popupExtra.innerText = `Your time - ${time}, level - ${level.levelName}`;
        lostSound.play();
        winner.classList.remove('active');
        iconWrapper.classList.add('lost');
        iconWrapper.classList.remove('won');

        addToScore(scores, 'losing', time, level);
    }

    renderScoreTable(scores);
}

function checkResult() {
    const initialGrid = sudoku.filledGrid.flat();
    const filledGrid = sudoku.clearedGrid.flat();

    return JSON.stringify(initialGrid) === JSON.stringify(filledGrid);
}

function nextGame() {
    clearInterval(timerId);
    const popupNextBtn = document.querySelector('.popup-next');
    const nextBtn = document.querySelector('.next');

    popupNextBtn.addEventListener('click', startNextGame);
    nextBtn.addEventListener('click', startNextGame);
}

function startNextGame() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('active');

    grid.innerHTML = '';
    init(false);
}

function showErrors() {
    const errorsBtn = document.querySelector('.errors');
    const cells = document.querySelectorAll('.cell');
    const initialGrid = sudoku.filledGrid.flat();

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
    const initialGrid = sudoku.filledGrid.flat();

    solutionBtn.onclick = () => {
        clearInterval(timerId);
        for (let i = 0; i < initialGrid.length; i++) {
            if (initialGrid[i] !== +cells[i].innerText) {
                cells[i].innerText = initialGrid[i];
                cells[i].classList.add('numbered');
            }
        }
    }
}

function restart() {
    const restartBtns = document.querySelectorAll('.restart');
    isPrevGame = true;

    restartBtns.forEach(btn => {
        btn.onclick = () => {
            clearInterval(timerId);

            const popup = document.querySelector('.popup');
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            }

            grid.innerHTML = '';

            if (isFinished) {
                scores.pop();
                localStorage.setItem('results', JSON.stringify(scores));
                renderScoreTable(scores);
            }

            init(isPrevGame);
        }
    })
}




function initTimer() {
    timer = setInterval(tick, 1000);
    return timer;
}

function tick() {

    const popup = document.querySelector(".popup");

    if (!isOver) {
        isOver = popup.classList.contains('active') ? true : false;
    }

    if (isOver) {
        clearInterval(timerId);
        return;
    }

    sec++;

    if (sec >= 60) {
        min++;
        sec = 0;
    }

    if (sec < 10) {
        if (min < 10) {
            timerEl.innerText = `0${min}:0${sec}`;
        } else {
            timerEl.innerText = `${min}:0${sec}`;
        }
    } else {
        if (min < 10) {
            timerEl.innerText = `0${min}:${sec}`;
        } else {
            timerEl.innerText = `${min}:${sec}`;
        }
    }
}






