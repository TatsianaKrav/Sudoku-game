export const GRID_SIZE = 9;
export const BOX_SIZE = 3;

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export function createElement(tagName, className) {
    const el = document.createElement(tagName);
    el.classList.add(className);
    return el;
}

export function getRowAndColumnIndex(index) {
    const rowIndex = Math.trunc(index / GRID_SIZE);
    const columnIndex = index % GRID_SIZE;

    return { rowIndex: rowIndex, columnIndex: columnIndex };
}

export function createSound(path) {
    const container = document.querySelector('.container');

    const sound = document.createElement('audio');
    sound.setAttribute('src', path);
    container.appendChild(sound);

    return sound;
}

export function addToScore(arr, value, gameTime, gameLevel) {
    if (arr.length === 10) {
        arr.shift();
    }

    arr.push({ result: value, time: gameTime, level: gameLevel });
    localStorage.setItem('results', JSON.stringify(arr));
}


export function renderScoreTable(arr) {
    const scoresTable = document.querySelector('.scores');
    scoresTable.innerHTML = '';

    arr.forEach((score, index) => {
        const scoreEl = createElement('div', 'score');
        scoresTable.appendChild(scoreEl);

        scoreEl.innerText = `${index + 1}. ${score.result} - ${score.time}, ${score.level.levelName} level`;
    })
}


