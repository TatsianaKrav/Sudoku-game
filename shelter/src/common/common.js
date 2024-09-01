import pets from "../../data/pets.json" with {type: 'json'}
import { capitalize, createElement, shuffle, getUnrepeatArr, goTo } from '../utilities/utilities.js'


const arrOfIndex = pets.map((item, index) => index);
const body = document.getElementsByTagName("body")[0];
const links = document.querySelectorAll('.menu-item a');
let currentWidth = parseInt(window.innerWidth);
const menu = document.getElementsByClassName('menu')[0];
const burger = document.getElementsByClassName('burger')[0];

showCard();
handleBurger(body);

if (currentWidth < 768) {
    navigate();
};

window.addEventListener('resize', () => {
    let width = parseInt(window.innerWidth);

    if (width < 768) {
        menu.style.visibility = 'hidden';
        navigate();
    } else {
        menu.style.visibility = 'visible';
    }
})


function navigate() {
    links.forEach(link => {
        link.addEventListener('click', (e) => goTo(e, link));
    })

    menu.addEventListener('click', (event) => hideMenu(menu, burger, event));
}

function handleBurger(body) {

    burger.onclick = () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');

        if (burger.classList.contains("active")) {
            body.style.overflowY = "hidden";
            menu.style.visibility = 'visible';
        } else {
            body.style.overflowY = "auto";
            menu.style.visibility = 'hidden';
        }

        document.querySelectorAll(".menu-item").forEach((item) => {
            item.addEventListener('click', (event) => hideMenu(menu, burger, event));
        });
    }
}

function hideMenu(elem1, elem2, e) {
    if (e.target.id === 'menu-list') {
        return;
    }

    elem1.classList.remove("active");
    elem2.classList.remove("active");
    elem1.style.visibility = 'hidden';
    body.style.overflowY = "auto";
}

function createPopup(element, elementTarget) {
    const pet = pets.find(pet => pet.name === elementTarget.currentTarget.dataset.name);
    const petImgPath = `../../assets/images/pets-modal/${pet.name.toLowerCase()}.png`;

    const modalWindow = createElement('div', 'modal-window', '');
    element.appendChild(modalWindow);

    const modalImage = createElement('div', 'modal-image', '');
    const modalInfo = createElement('div', 'modal-info', '');
    const closeBtn = createElement('div', 'close-btn', '');
    modalWindow.append(modalImage, modalInfo, closeBtn);

    closeBtn.addEventListener('click', () => hidePopup(element));

    const image = createElement('img', '', '');
    image.setAttribute("src", petImgPath);
    image.setAttribute("alt", `${pet.name}`);
    modalImage.appendChild(image);

    const petName = createElement('p', "pet-name", `${pet.name}`, '');
    const petSpan = createElement('span', '', `${pet.type} - ${pet.breed}`, '');
    const petDescription = createElement('p', "pet-description", `${pet.description}`, '');
    const petInfo = createElement('div', "pet-info", '');
    const ulList = createElement('ul', '', '');


    for (let i = 0; i < 4; i++) {
        const info = ['age', 'inoculations', 'diseases', 'parasites'];
        let petField = info[i];

        const liElem = createElement('li', 'modal-li', '');
        const spanElem = createElement('span', '', capitalize(petField) + `: ${'\u00A0'}`);
        const pInfo = createElement('p', '', `  ${pet[petField]}`);
        liElem.append(spanElem, pInfo);
        ulList.appendChild(liElem);
    }

    petInfo.appendChild(ulList);
    modalInfo.append(petName, petSpan, petDescription, petInfo);

    closeBtn.innerHTML = ` <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
                                    fill="#292929" />
                            </svg>`

    return element;
}

export function handlePopup(event) {
    const modal = document.querySelector('.modal-wrapper');
    if (event) {
        createPopup(modal, event);
        openPopup(modal);
    }


    modal.onclick = (event) => {
        if (event.target === modal) {
            hidePopup(modal);
        }
    }
}

function openPopup(modal) {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    body.style.overflowY = "hidden";
}

function hidePopup(modal) {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    body.style.overflowY = "auto";
    modal.innerHTML = '';
}


function showCard() {
    const fiendsCards = document.querySelector('.friends');
    const petsCards = document.querySelector('.pets-sliders');
    const sliderLeft = document.querySelector('.slider-left');
    const sliderActive = document.querySelector('.slider-active');
    const sliderRight = document.querySelector('.slider-right');

    let randomArr = shuffle(arrOfIndex);
    const listOfPets = getUnrepeatArr(arrOfIndex, randomArr.slice(0, 4));


    if (petsCards) {
        let listOfPetsLeft = getUnrepeatArr(arrOfIndex, listOfPets).slice(0, 3);
        let listOfPetsRight = getUnrepeatArr(arrOfIndex, listOfPets).slice(0, 3);

        createCard(sliderActive, listOfPets.slice(0, 3));
        createCard(sliderLeft, listOfPetsLeft);
        createCard(sliderRight, listOfPetsRight);
    }
}

export function createCard(parent, arr) {

    arr.forEach((index) => {
        const card = createElement('div', 'card', '');
        let pathToImg = `../../assets/images/pets/pets-${pets[index].name.toLowerCase()}.png`;


        card.setAttribute('data-name', pets[index].name);

        const image = createElement('div', 'pet-image', '');
        const img = createElement('img', '', '');
        img.setAttribute('src', pathToImg);
        img.setAttribute('alt', pets[index].name);
        image.append(img);

        const petName = createElement('div', 'pet-name', pets[index].name);
        const button = createElement('button', 'pet-btn btn', 'Learn more');

        card.append(image, petName, button);
        parent.append(card);
        card.addEventListener('click', (event) => handlePopup(event));
    })
}