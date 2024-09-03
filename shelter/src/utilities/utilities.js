function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerText = text;

    return element;
}

function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));;
        let temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }

    return arr;
}

function getUnrepeatArr(arr1, arr2) {
    shuffle(arr1);
    return arr1.filter(index => arr2.every(num => index !== num));
}


function goTo(e, link) {
    e.preventDefault();
    setTimeout(onAnimationComplete, 1000, link);
}

function onAnimationComplete(link) {
    window.location = link.href;
}

function getPagesAmount(width) {
    if (width >= 970) {
        return 6;
    } else if (width < 970 && width >= 640) {
        return 8;
    } else {
        return 16;
    }
}

function getLastElems(arr, amount) {
    if (arr.length < amount || arr.length % amount === 0) return [];
    let rest = arr.length % amount;
    let lastElems = arr.slice(arr.length - rest);
    return lastElems;
}

function getSubArr(arr, size) {
    let newArr = [];

    for (let i = 0; i < arr.length; i += size) {
        let sub = arr.slice(i, i + size);
        newArr.push(sub);
    }

    return newArr;
}

export { capitalize, createElement, shuffle, getUnrepeatArr, goTo, getPagesAmount, getLastElems }