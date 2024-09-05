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
    const petImgPath = `../../assets/images/pets/pets-${pet.name.toLowerCase()}.png`;

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
        const pInfo = createElement('span', '', `  ${pet[petField]}`);
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

console.log(`110/ 110 
Реализация burger menu на обеих страницах: +26
+ при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2
+ при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4
высота адаптивного меню занимает всю высоту экрана: +2
+ при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство (оба варианта должны быть реализованы) адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно: +4
бургер-иконка создана при помощи html+css, без использования изображений: +2
+ ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню: +2
при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2
расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая: +2
+ область, свободная от бургер-меню, затемняется: +2
+ страница под бургер-меню не прокручивается: +4

Реализация слайдера-карусели на странице Main: +36
+ при нажатии на стрелки происходит переход к новому блоку элементов: +4
+ смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется): +4
+ слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек: +4
 + при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4
+ каждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
в текущем блоке слайда карточки с питомцами не повторяются: +4
+ в следующем блоке нет дублирования карточек с текущим блоком: +2
+ генерация наборов карточек происходит на основе 8 объектов с данными о животных: +2
+ при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы (набор карточек при этом может как изменяться, так и оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования): +4

Реализация пагинации на странице Pets: +36
+ при перезагрузке страницы всегда открывается первая страница пагинации: +2
+ при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2
+ при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2
+ при открытии первой страницы кнопки << и < неактивны: +2 
+ + при открытии последней страницы кнопки > и >> неактивны: +2
в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2
+ каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
+ при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4
+ при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4
+ карточки питомцев не должны повторяться на одной странице: +4
+ при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4
+ при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2
+ общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2
+ при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +4

Реализация попап на обеих страницах: +12
+ попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2
+ часть страницы вне попапа затемняется: +2
+ при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2
+ при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается (оба варианта должны быть реализованы), при этом при нажатии на сам попап ничего не происходит: +2
+ кнопка с крестиком интерактивная: +2
+ окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2`)