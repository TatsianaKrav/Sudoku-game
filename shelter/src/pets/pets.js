import { shuffle, getPagesAmount, getLastElems } from '../utilities/utilities.js';
import { createCard } from '../common/common.js';

let cardsPerPage = 0;
let pagesAmount = 6;
let currentPageNum = 1;
let currentWidth = parseInt(window.innerWidth);
const friendsCards = document.querySelector('.friends');
const nextPageBtn = document.querySelector('.page-next');
const backPageBtn = document.querySelector('.page-back');
const currentPage = document.querySelector('.current-page');
const startPage = document.querySelector('.start-page');
const endPage = document.querySelector('.end-page');
let arrOfAllPets = [];
arrOfAllPets = getAllPets();

window.onload = () => {
    showCards(currentWidth);
}

window.addEventListener('resize', () => {
    let screenWidth = parseInt(window.innerWidth);
    let amount = getPagesAmount(screenWidth);
    currentWidth = screenWidth;

    if (amount === pagesAmount) return;

    if (amount === 6 && +currentPage.innerText > 6 ||
        amount === 8 && +currentPage.innerText > 8
    ) {
        currentPageNum = 1;
        currentPage.innerText = '1';
        checkPagePosition(currentPage);
    }

    showCards();
    checkPagePosition(currentPage);
})

pagination(arrOfAllPets);

function getAllPets() {
    arrOfAllPets.length = 0;

    for (let i = 0; i < 6; i++) {

        let arr = new Array(8).fill(0).map((item, index) => index);
        let random = shuffle(arr);

        while (random.length) {
            let last6 = getLastElems(arrOfAllPets, 6);
            let last3 = getLastElems(arrOfAllPets, 3);
            let last = random.pop();

            if (last6.includes(last) || last3.includes(last)) {
                random.unshift(last);
            } else {
                arrOfAllPets.push(last);
            }
        }
    }
    return arrOfAllPets;
}

function showCards() {

    pagesAmount = getPagesAmount(currentWidth);
    cardsPerPage = arrOfAllPets.length / pagesAmount;
    friendsCards.innerHTML = '';
    let start = (currentPageNum - 1) * cardsPerPage;
    let end = start + cardsPerPage;
    createCard(friendsCards, arrOfAllPets.slice(start, end));
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

function pagination(arr) {
    openFirstPage(arr);
    openLastPage(arr);
    openPrevPage(arr);
    openNextPage(arr);
}


function openFirstPage(arr) {
    startPage.onclick = () => {
        currentPage.innerText = 1;
        currentPageNum = 1;
        friendsCards.innerHTML = '';
        createCard(friendsCards, arr.slice(0, cardsPerPage));
        checkPagePosition(currentPage);
    }
}

function openLastPage(arr) {
    endPage.onclick = () => {
        currentPage.innerText = pagesAmount;
        currentPageNum = pagesAmount;
        let start = (currentPageNum - 1) * cardsPerPage;
        let end = start + cardsPerPage;

        friendsCards.innerHTML = '';
        createCard(friendsCards, arr.slice(start, end));
        checkPagePosition(currentPage);
    }
}

function openNextPage(arr) {
    nextPageBtn.addEventListener('click', () => {
        if (currentPageNum++ < pagesAmount) {
            currentPage.innerText = currentPageNum;

            let start = (currentPageNum - 1) * cardsPerPage;
            let end = start + cardsPerPage;

            friendsCards.innerHTML = '';
            createCard(friendsCards, arr.slice(start, end));

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

            friendsCards.innerHTML = '';
            createCard(friendsCards, arr.slice(start, end));

        }
        checkPagePosition(currentPage);
    })
}
