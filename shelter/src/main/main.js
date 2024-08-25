import pets from '../../data/pets.json' with {type: 'json'}
import { createCard } from '../common/common.js';
import { shuffle } from '../utilities/utilities.js';


let countSlider = 1;
let slidersList = document.querySelectorAll('.slider');

handleSlider();


function handleSlider() {
    const nextBtn = document.querySelector('.narrow-next');
    const backBtn = document.querySelector('.narrow-back');
    const sliders = document.querySelector('.pets-sliders');

    nextBtn.addEventListener('click', nextSlide);
    backBtn.addEventListener('click', prevSlider);
}

function nextSlide() {

    slidersList[countSlider].style.animation = "next1 0.5s linear forwards";
    if (countSlider >= slidersList.length - 1) {
        countSlider = 0;
    } else {
        countSlider++;
    }

    slidersList[countSlider].style.animation = "next2 0.5s linear forwards";

    // recreate cards
    let count = countSlider;
    if (count++ >= slidersList.length - 1) {
        rewriteCards(slidersList[0], slidersList[countSlider]);
    } else {
        rewriteCards(slidersList[count++], slidersList[countSlider]);
    }

    count = 0;
}

function prevSlider() {
    slidersList[countSlider].style.animation = "prev1 0.5s linear forwards";
    if (countSlider === 0) {
        countSlider = slidersList.length - 1;
    } else {
        countSlider--;
    }
    slidersList[countSlider].style.animation = "prev2 0.5s linear forwards";

    // recreate cards
    let count = countSlider;
    if (count-- <= 0) {
        rewriteCards(slidersList[slidersList.length - 1], slidersList[countSlider]);
    } else {
        rewriteCards(slidersList[count--], slidersList[countSlider]);
    }

    count = 0;
}


function rewriteCards(sliderToShow, currentSlider) {
    const cards = [...currentSlider.children];
    const arrOfPetNames = cards.map(card => card.dataset.name);
    const arrOfIndex = [];

    pets.forEach((pet, index) => {
        if (!arrOfPetNames.includes(pet.name)) {
            arrOfIndex.push(index);
        }
    })

    sliderToShow.innerHTML = '';
    createCard(sliderToShow, shuffle(arrOfIndex).slice(0, 3));
}