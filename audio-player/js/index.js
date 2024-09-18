import data from "../data/data.js"
import { shuffle, getTime } from "./utils.js";

const audio = document.querySelector('.audio');
const author = document.querySelector('.author-name');
const title = document.querySelector('.song-name');
const songDuration = document.querySelector('.total-time');
const image = document.querySelector('.player-image');
const activeBtn = document.querySelector('.active-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const shuffleBtn = document.querySelector('.shuffle');
const volumeBtn = document.querySelector('.volume-btn');
const currentTimeSong = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress');
const bar = document.querySelector(".bar");

let songsList = shuffle(data);
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

    audio.addEventListener('timeupdate', () => {
        bar.style.width = audio.currentTime / audio.duration * 100 + "%";
        currentTimeSong.innerText = getTime(audio.currentTime);
    })

    audio.addEventListener('ended', () => {
        playNextSong(false);
    })
}

activeBtn.addEventListener('click', () => {
    activeBtn.classList.toggle('pause');
    checkState();
})

nextBtn.addEventListener('click', () => {
    playNextSong(isPaused);
});

prevBtn.addEventListener('click', () => {
    songCount = --songCount < 0 ? songsList.length - 1 : songCount;
    bar.style.width = 0;
    renderPlayer(songsList[songCount]);
    if (!isPaused) {
        audio.play();
    }
})

progressBar.addEventListener('click', (e) => {
    const prBarWidth = parseInt(window.getComputedStyle(progressBar).width);
    const pourc = e.offsetX * 100 / prBarWidth;
    const time = audio.duration * pourc / 100;
    audio.currentTime = time;
})

shuffleBtn.addEventListener('click', () => {
    songsList = shuffle(data);
    renderPlayer(songsList[0]);
})

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');

    if (!volumeBtn.classList.contains('active')) {
        audio.volume = 0;
    } else {
        //prev value of volume
        audio.volume = .7;
    }
})

function playNextSong(bool) {
    songCount = ++songCount >= songsList.length ? 0 : songCount;
    bar.style.width = 0;
    renderPlayer(songsList[songCount]);
    if (!bool) audio.play();
}


function checkState() {
    if (activeBtn.classList.contains('pause')) {
        isPaused = true;
        audio.pause();
    } else {
        isPaused = false;
        audio.play();
    }
}
