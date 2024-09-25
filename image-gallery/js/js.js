const KEY = 'Z7YhGgww0fM50XllRlscVwIAhaLF97wpYJj6uiPn3us';

const gallery = document.querySelector('.main');
const form = document.querySelector('.search');
const input = document.querySelector('.search-field');
const magnifier = document.querySelector('.magnifier');
const cross = document.querySelector('.cross');

window.onload = () => {
    input.focus();
    input.addEventListener('input', () => {
        if (input.value) {
            setTimeout(() => {
                magnifier.classList.remove('active');
                cross.classList.add('active');
            }, 1000)

        } else {
            setTimeout(() => {
                magnifier.classList.add('active');
                cross.classList.remove('active');
            }, 1000)
        }
    })
}

async function getData() {

    try {
        const url = `https://api.unsplash.com/photos/random?client_id=${KEY}&count=15&orientation=landscape`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            renderImages(data);
        } else {
            gallery.innerText = 'Something went wrong...';
        }
    } catch (error) {
        console.log(error);
        gallery.innerText = 'Something went wrong...';
    }

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




cross.addEventListener('click', () => {
    cross.classList.remove('active');
    magnifier.classList.add('active');
    input.value = '';
    input.focus();
})
