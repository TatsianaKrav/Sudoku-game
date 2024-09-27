const KEY = 'Z7YhGgww0fM50XllRlscVwIAhaLF97wpYJj6uiPn3us';
const url = `https://api.unsplash.com/photos/random?client_id=${KEY}&count=12&orientation=landscape`;

const gallery = document.querySelector('.main');
const galleryWrap = document.querySelector('.images-wrapper');
const form = document.querySelector('.search');
const input = document.querySelector('.search-field');
const magnifier = document.querySelector('.magnifier');
const cross = document.querySelector('.cross');
const loader = document.querySelector('.loader');

window.onload = () => {
    input.focus();
    input.addEventListener('input', () => {
        if (input.value) {
            cross.classList.add('active');
        } else {
            cross.classList.remove('active');
        }
    })

    getData(url);
}

async function getData(link) {

    try {
        loader.classList.add('active');
        const response = await fetch(link);
        const data = await response.json();

        if (response.ok && (data.length || data.total > 0)) {
            loader.classList.remove('active');
            document.body.style.overflowY = 'auto';


            if (data.hasOwnProperty('results')) {
                renderImages(data.results);
            } else {
                renderImages(data);
            }

        } else if (data.length === 0 || data.total === 0) {
            loader.classList.remove('active');
            showErrorMessage('Images are not found');
        } else {
            loader.classList.remove('active');
            showErrorMessage('Something went wrong...');
        }
    } catch (error) {
        loader.classList.remove('active');
        console.log(error);
        showErrorMessage('Something went wrong...');
    }
}

form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        sendSearchRequest();
    }
})

magnifier.addEventListener('click', () => {
    if (!input.value) return;
    sendSearchRequest();
})


cross.addEventListener('click', () => {
    cross.classList.remove('active');
    input.value = '';
    input.focus();
    getData(url);
})

function renderImages(items) {
    galleryWrap.innerHTML = '';
    const textWrapper = document.querySelector('.text-wrapper');
    if (textWrapper) textWrapper.remove();

    items.forEach(el => {
        const url = el.urls.regular;
        const wrapper = createImageWrapper();
        wrapper.style.backgroundImage = `url(${url})`;
        galleryWrap.append(wrapper);
    })
}

function createImageWrapper() {
    const el = document.createElement('div');
    el.classList.add('image-wrapper');
    return el;
}

function sendSearchRequest() {
    const query = input.value;
    const searchURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${KEY}&per_page=9&orientation=landscape`;
    getData(searchURL);
}

function showErrorMessage(message) {
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('text-wrapper');
    textWrapper.innerText = message;
    galleryWrap.innerHTML = '';
    gallery.prepend(textWrapper);
    document.body.style.overflowY = 'hidden';
}
