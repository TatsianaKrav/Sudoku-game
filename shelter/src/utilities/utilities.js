function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerText = text;

    return element;
}

export { capitalize, createElement }