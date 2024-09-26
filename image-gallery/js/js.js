const KEY = 'Z7YhGgww0fM50XllRlscVwIAhaLF97wpYJj6uiPn3us';
const url = `https://api.unsplash.com/photos/random?client_id=${KEY}&count=5&orientation=landscape`;

const gallery = document.querySelector('.main');
const form = document.querySelector('.search');
const input = document.querySelector('.search-field');
const magnifier = document.querySelector('.magnifier');
const cross = document.querySelector('.cross');

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
        const response = await fetch(link);
        const data = await response.json();

        if (response.ok && (data.length || data.total > 0)) {
            if (data.hasOwnProperty('results')) {
                renderImages(data.results);
            } else {
                renderImages(data);
            }

        } else {
            gallery.innerText = 'Something went wrong...';
        }
    } catch (error) {
        console.log(error);
        gallery.innerText = 'Something went wrong...';
    }

}

form.addEventListener('keyup', async (e) => {
    if (e.keyCode === 13) {
        const query = input.value;
        const searchURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${KEY}&count=15&orientation=landscape`;
        getData(searchURL);
    }
})

magnifier.addEventListener('click', (event) => {
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
    gallery.innerHTML = '';

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

function sendSearchRequest() {
    const query = input.value;
    const searchURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${KEY}&count=15&orientation=landscape`;
    getData(searchURL);
}

function findKey(object, keyWord) {
    const arr = Object.keys(object);
    let result;

    if (object.hasOwnProperty(keyWord)) return object[keyWord];

    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];

        if (typeof object[key] === 'object') {
            result = findKey(object[key], keyWord);
            if (result) return result;
        }
    }

    return {};
}

