import data from "./data/data.js"

const author = document.querySelector('.author-name');
const song = document.querySelector('.song-name');
const duration = document.querySelector('.total-time');
const image = document.querySelector('.player-image');
const activeBtn = document.querySelector('.active-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const currentTime = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress');
const bar = document.querySelector(".bar");

const songsList = shuffle(data);
let currentSong = songsList[0];
let songCount = 0;
let interval = 0;

createAudio(currentSong);

function createAudio(el) {
    const audio = new Audio(el.src);
    audio.addEventListener("loadeddata", () => {
        author.innerText = el.author;
        song.innerText = el.song;
        duration.innerText = getTime(audio.duration);
        image.style.backgroundImage = `url(${el.image})`;
        clearInterval(interval);
        currentTime.innerText = "00:00";
        bar.style.width = 0;
        audio.currentTime = 0;
    })

    audio.addEventListener('ended', () => {
        activeBtn.classList.toggle('pause');
        currentTime.innerText = "00:00";
    })

    activeBtn.addEventListener('click', () => {
        activeBtn.classList.toggle('pause');
        if (activeBtn.classList.contains('pause')) {
            audio.pause();
        } else if (!activeBtn.classList.contains('pause')) {
            audio.play();
            moveBar(audio);
            handleProgressBar(audio);
        }
    });
}

function moveBar(audioEl) {
    interval = setInterval(() => {
        bar.style.width = audioEl.currentTime / audioEl.duration * 100 + "%";
        currentTime.innerText = getTime(audioEl.currentTime);

        if (currentTime.innerText === duration.innerText) {
            clearInterval(interval);
        }
    }, 1000)
}

function handleProgressBar(audioEl) {
    progressBar.addEventListener("click", e => {
        const prBarWidth = window.getComputedStyle(progressBar).width;
        const timeToPlay = e.offsetX / parseInt(prBarWidth) * audioEl.duration;
        audioEl.currentTime = timeToPlay;
    }, false);
}

nextBtn.addEventListener('click', () => {
    songCount = ++songCount >= songsList.length ? 0 : songCount;
    createAudio(songsList[songCount]);
    currentSong = songsList[songCount];
})

prevBtn.addEventListener('click', () => {
    songCount = --songCount < 0 ? songsList.length - 1 : songCount;
    createAudio(songsList[songCount]);
    currentSong = songsList[songCount];
})

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

