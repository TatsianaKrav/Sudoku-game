import data from "../data/data.js"
import { shuffle, getTime } from "./utils.js";

const player = document.querySelector('.player');
const audio = document.querySelector('.audio');
const author = document.querySelector('.author-name');
const title = document.querySelector('.song-name');
const songDuration = document.querySelector('.total-time');
const image = document.querySelector('.player-image');
const activeBtn = document.querySelector('.active-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const currentTimeSong = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress');
const bar = document.querySelector(".bar");

const songsList = shuffle(data);
let songCount = 0;
let isPaused = false;

renderPlayer(songsList[songCount]);

function renderPlayer(song) {
    audio.src = song.src;
    author.innerText = song.author;
    title.innerText = song.song;
    image.style.backgroundImage = `url(${song.image})`;

    audio.addEventListener('loadeddata', () => {
        songDuration.innerText = getTime(audio.duration);
    })
}

activeBtn.addEventListener('click', () => {
    activeBtn.classList.toggle('pause');
    checkState();
})

nextBtn.addEventListener('click', () => {
    songCount = ++songCount >= songsList.length ? 0 : songCount;
    renderPlayer(songsList[songCount]);
    if (!isPaused) {
        audio.play();
    }
})

prevBtn.addEventListener('click', () => {
    songCount = --songCount < 0 ? songsList.length - 1 : songCount;
    renderPlayer(songsList[songCount]);
    if (!isPaused) {
        audio.play();
    }
})


function checkState() {
    if (activeBtn.classList.contains('pause')) {
        isPaused = true;
        audio.pause();
    } else {
        isPaused = false;
        audio.play();
    }
}
