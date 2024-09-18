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
