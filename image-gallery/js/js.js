const KEY = 'Z7YhGgww0fM50XllRlscVwIAhaLF97wpYJj6uiPn3us';
const url = `https://api.unsplash.com/photos/random?client_id=${KEY}&count=15&orientation=landscape`;

const gallery = document.querySelector('.main');
const form = document.querySelector('.search');
const input = document.querySelector('.search-field');

async function getData() {
    const response = await fetch(url);
    const data = await response.json(); // массив объектов
    console.log(data);

    renderImages(data);
}

getData();

function renderImages(items) {
    items.forEach(el => {
        const url = el.urls.regular;
        const wrapper = createImageWrapper();
        wrapper.style.backgroundImage = `url(${url})`;
        gallery.append(wrapper);
    })
}

function createImageWrapper() {
    const el = document.createElement('div');
    el.classList.add('image-wrapper');
    return el;
}


