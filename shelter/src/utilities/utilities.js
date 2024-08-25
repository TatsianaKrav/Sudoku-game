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
    return arr1.filter(index => arr2.every(num => index !==num));
}

export { capitalize, createElement, shuffle, getUnrepeatArr }