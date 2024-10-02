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