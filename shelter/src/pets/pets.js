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
let allPets = [];

window.onload = () => {
    createPetsArr(firstWidth);
    handlePopup();
}

/* window.addEventListener('resize', () => {
    screenWidth = parseInt(window.innerWidth);
    createPetsArr(screenWidth);
})
 */

function getAllPets() {
    for (let i = 0; i < 6; i++) {

        let arr = new Array(8).fill(0).map((item, index) => index);
        let random = shuffle(arr);


        while (random.length) {
            let last6 = getLastElems(allPets, 6);
            let last3 = getLastElems(allPets, 3);
            let last = random.pop();

            if (last6.includes(last) || last3.includes(last)) {
                random.unshift(last);
            } else {
                allPets.push(last);
            }
        }
    }

    console.log(getSubArr(allPets, 8));
    console.log(getSubArr(allPets, 6));
    console.log(getSubArr(allPets, 3));

    return allPets;
}

function getSubArr(arr, size) {
    let newArr = [];

    for (let i = 0; i < arr.length; i += size) {
        let sub = arr.slice(i, i + size);
        newArr.push(sub);
    }

    return newArr;
}

function getLastElems(arr, amount) {
    if (arr.length < amount || arr.length % amount === 0) return [];

    let lastElems = arr.slice(arr.length - amount);
    return lastElems;
}


function createPetsArr(width) {
    let arrOfAllPets = getAllPets();
    createCard(fiendsCards, arrOfAllPets.slice(0, cardsPerPage));

    openNextPage(arrOfAllPets);
    openPrevPage(arrOfAllPets);
    openFirstPage(arrOfAllPets);
    openLastPage(arrOfAllPets);
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


