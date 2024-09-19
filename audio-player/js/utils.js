function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getTime(num) {
    let sec = parseInt(num);
    let min = parseInt(sec / 60);
    sec = sec % 60;

    sec = sec < 10 ? `0${sec}` : `${sec}`;
    min = min < 10 ? `0${min}` : `${min}`;

    return `${min}:${sec}`;
}

function createElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.classList.add(className);
    return elem;
}

export { shuffle, getTime, createElement };