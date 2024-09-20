import data from "../data/data.js"
import { shuffle, getTime, createElement } from "./utils.js";

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
const volumeBarBtn = document.querySelector('.volume-bar');
const volumeProgressBtn = document.querySelector('.volume-progress');
const currentTimeSong = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress');
const bar = document.querySelector(".bar");
const playlist = document.querySelector(".playlist");
const playlistInfo = document.querySelector(".playlist-info");

let songsList = shuffle(data);
let songCount = 0;
let isPaused = true;

renderPlayer(songsList[songCount]);

function renderPlayer(song) {
    audio.src = song.src;
    author.innerText = song.author;
    title.innerText = song.song;
    image.style.backgroundImage = `url(${song.image})`;
    /*  volumeProgressBtn.style.height = audio.volume * 100 + '%'; */

    checkVolume();

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

shuffleBtn.addEventListener('click', shuffleList);

playlist.addEventListener('click', handlePlaylist);

function handlePlaylist() {
    playlistInfo.classList.toggle('open');

    if (playlistInfo.classList.contains('open')) {
        createPlaylist();
    } else {
        playlistInfo.innerHTML = '';
    }
}

function createPlaylist() {
    songsList.forEach(item => {
        renderPlaylist(item);
    })
}

function renderPlaylist(el) {
    const itemWrapper = createElement('div', 'song-wrapper');
    itemWrapper.setAttribute('data-id', el.id);
    const song = createElement('span', 'track');
    song.innerHTML = `<span>${el.author}</span> - ${el.song}`;

    itemWrapper.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const chosenTrack = songsList.find(item => item.id === +id);
        renderPlayer(chosenTrack);
        playlistInfo.classList.remove('open');
        playlistInfo.innerHTML = '';
        songCount = songsList.indexOf(chosenTrack);

        if (!isPaused) {
            audio.play();
        } else {
            bar.style.width = 0;
        }
    })

    itemWrapper.append(song);
    playlistInfo.append(itemWrapper);
}

function shuffleList() {
    const prevList = [...songsList];
    songsList = shuffle(data);

    if (prevList[0] === songsList[0]) {
        shuffleList();
    }
    renderPlayer(songsList[0]);
    if (!isPaused) {
        audio.play()
    } else {
        bar.style.width = 0;
    };
}

volumeBtn.addEventListener('click', (e) => {
    if (!e.target.classList.contains('volume-btn')) return;

    volumeBtn.classList.toggle('active');

    if (!volumeBtn.classList.contains('active')) {
        localStorage.setItem('volume', audio.volume);
        audio.volume = 0;
        volumeProgressBtn.style.height = 0;
    } else {
        audio.volume = localStorage.getItem('volume');
        volumeProgressBtn.style.height = audio.volume * 100 + '%';
    }
})

volumeBarBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('volume-btn')) return;

    const height = parseInt(window.getComputedStyle(volumeBarBtn).height);
    const newVolume = e.offsetY * 100 / height;
    audio.volume = newVolume / 100;
    volumeProgressBtn.style.height = newVolume + '%';
    localStorage.setItem('volume', audio.volume);
})

function playNextSong(bool) {
    let count = songCount;
    songCount = ++count === songsList.length ? 0 : ++songCount;
    bar.style.width = 0;

    renderPlayer(songsList[songCount]);
    setTimeout(() => {
        if (!bool) audio.play();
    }, 500)

}

function checkVolume() {
    const prevVolume = localStorage.getItem('volume');

    if (prevVolume) {
        audio.volume = prevVolume;
        volumeProgressBtn.style.height = audio.volume * 100 + '%';
    } else {
        audio.volume = 0.70;
        volumeProgressBtn.style.height = audio.volume * 100 + '%';
        localStorage.setItem('volume', audio.volume);
    }
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
