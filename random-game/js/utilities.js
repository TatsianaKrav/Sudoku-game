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

export function addToScore(value) {
    let results = JSON.parse(localStorage.getItem('results'));
    results = results.length > 0 ? results : localStorage.setItem('results', JSON.stringify([]));

    if (results && results.length === 10) {
        results.shift();
    }

    results.push({ result: value });

    localStorage.setItem('results', JSON.stringify(results));

    return results;
}
