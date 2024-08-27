import pets from '../../data/pets.json' with {type: 'json'}
import { shuffle } from '../utilities/utilities.js';
import { createCard } from '../common/common.js';
import { handlePopup } from '../common/common.js'



let cardsPerPage = 8;
let pagesAmount = 6;
let currentPageNum = 1;
let screenWidth = 0;
const arrOfIndex = pets.map((item, index) => index);
let arrOfAllPets = shuffle(arrOfIndex);
let firstWidth = parseInt(window.innerWidth);
const fiendsCards = document.querySelector('.friends');
const nextPageBtn = document.querySelector('.page-next');
const backPageBtn = document.querySelector('.page-back');
const currentPage = document.querySelector('.current-page');
const startPage = document.querySelector('.start-page');
const endPage = document.querySelector('.end-page');

window.onload = () => {
    createPetsArr(firstWidth);
    handlePopup();
}

window.addEventListener('resize', () => {
    screenWidth = parseInt(window.innerWidth);
    createPetsArr(screenWidth);
})


function createPetsArr(width) {
    let arrOfAllPets = getAllPets();

    if (width >= 1280) {
        createCard(fiendsCards, arrOfAllPets.slice(0, cardsPerPage));

        openNextPage(arrOfAllPets);
        openPrevPage(arrOfAllPets);
        openFirstPage(arrOfAllPets);
        openLastPage(arrOfAllPets);
    }
}

function checkPagePosition(page) {

    if (+page.innerText > 1 && +page.innerText < pagesAmount) {
        startPage.classList.remove('disabled');
        endPage.classList.remove('disabled');
        nextPageBtn.classList.remove('disabled');
        backPageBtn.classList.remove('disabled');

    } else if (+page.innerText === 1) {
        backPageBtn.classList.add('disabled');
        startPage.classList.add('disabled');
        nextPageBtn.classList.remove('disabled');
        endPage.classList.remove('disabled');

    } else if (+page.innerText === pagesAmount) {
        nextPageBtn.classList.add('disabled');
        endPage.classList.add('disabled');
        backPageBtn.classList.remove('disabled');
        startPage.classList.remove('disabled');
    }


}

function rememberState() {
    return fiendsCards.innerHTML;
}


function getAllPets() {
    let arr = [];

    for (let i = 0; i < pagesAmount; i++) {
        let subArr = shuffle(arrOfIndex);
        arr = arr.concat(subArr);
    }

    return arr;
}

function openFirstPage(arr) {
    startPage.onclick = () => {
        currentPage.innerText = 1;
        currentPageNum = 1;
        fiendsCards.innerHTML = '';
        createCard(fiendsCards, arr.slice(0, cardsPerPage));
        checkPagePosition(currentPage);
    }
}

function openLastPage(arr) {
    endPage.onclick = () => {
        currentPage.innerText = pagesAmount;
        currentPageNum = pagesAmount;
        let start = (currentPageNum - 1) * cardsPerPage;
        let end = start + cardsPerPage;

        fiendsCards.innerHTML = '';
        createCard(fiendsCards, arr.slice(start, end));
        checkPagePosition(currentPage);
    }
}

function openNextPage(arr) {
    nextPageBtn.addEventListener('click', () => {
        if (currentPageNum++ < pagesAmount) {
            currentPage.innerText = currentPageNum;

            let start = (currentPageNum - 1) * cardsPerPage;
            let end = start + cardsPerPage;

            fiendsCards.innerHTML = '';
            createCard(fiendsCards, arr.slice(start, end));

        }

        checkPagePosition(currentPage);
    })
}

function openPrevPage(arr) {
    backPageBtn.addEventListener('click', () => {

        if (currentPageNum-- > 1) {
            currentPage.innerText = currentPageNum;

            let start = (currentPageNum - 1) * cardsPerPage;
            let end = start + cardsPerPage;

            fiendsCards.innerHTML = '';
            createCard(fiendsCards, arr.slice(start, end));

        }
        checkPagePosition(currentPage);
    })
}


