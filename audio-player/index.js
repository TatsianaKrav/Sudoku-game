import data from "./data/data.js"

const player = document.querySelector('.container');
const author = document.querySelector('.author-name');
const song = document.querySelector('.song-name');
const duration = document.querySelector('.total-time');
const image = document.querySelector('.player-image');
const activeBtn = document.querySelector('.active-btn');

/* let random = getRandom();
let currentSong = data[random]; */

const songsList = shuffle(data);
let currentSong = songsList[0];
let songCount = 0;


const audio = new Audio(currentSong.src);
audio.addEventListener("loadeddata", () => {
    author.innerText = currentSong.author;
    song.innerText = currentSong.song;
    duration.innerText = getTime(audio.duration);
    image.style.backgroundImage = `url(${currentSong.image})`;
})
audio.play();

activeBtn.addEventListener('click', () => {
    activeBtn.classList.toggle('pause');
    if (activeBtn.classList.contains('pause')) {
        audio.pause();
    } else if (!activeBtn.classList.contains('pause')) {
        audio.play();
    }
});




function getRandom() {
    return Math.floor(Math.random() * data.length);
}

function getTime(num) {
    let sec = parseInt(num);
    let min = parseInt(sec / 60);
    sec = sec % 60;

    sec = sec < 10 ? `0${sec}` : `${sec}`;
    min = min < 10 ? `0${min}` : `${min}`;

    return `${min}:${sec}`;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

