import data from "./data/data.js"

const player = document.querySelector('.container');
const author = document.querySelector('.author-name');
const song = document.querySelector('.song-name');
const duration = document.querySelector('.total-time');
const image = document.querySelector('.player-image');
const activeBtn = document.querySelector('.active-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const currentTime = document.querySelector('.current-time');
const progressBar = document.querySelector('.progress');

const songsList = shuffle(data);
let currentSong = songsList[0];
let songCount = 0;

createAudio(currentSong);

function createAudio(el) {
    const audio = new Audio(el.src);
    audio.addEventListener("loadeddata", () => {
        author.innerText = el.author;
        song.innerText = el.song;
        duration.innerText = getTime(audio.duration);
        image.style.backgroundImage = `url(${el.image})`;

        moveBar(audio);
    })

    activeBtn.addEventListener('click', () => {
        activeBtn.classList.toggle('pause');
        if (activeBtn.classList.contains('pause')) {
            audio.pause();
        } else if (!activeBtn.classList.contains('pause')) {
            audio.play();
        }
    });

    /*     test(audio); */

    /*  function testBar(audioEl) {
         progressBar.classList.add('active');
         progressBar.style.transitionDuration = `${audioEl.duration}`;
     } */


    const bar = document.querySelector(".bar");
    function moveBar(audioEl) {
        setInterval(() => {
            bar.style.width = audio.currentTime / audio.duration * 100 + "%";
            currentTime.innerText = getTime(audioEl.currentTime);
        }, 1000)


        /*   progressBar.classList.add('active'); */
        /*  progressBar.style.animation = `moveBar ${audioEl.duration} linear`; */
        /* progressBar.classList.add('active');
        progressBar.animate([
            { from: 'width: 0%' },
            { to: 'width: 100%' }
        ], {
            duration: audioEl.duration,
            iterations: 1
        }) */
    }

    /*  setInterval(() => {
         currentTime.innerText = getTime(audio.currentTime);
     }, 1000); */

    /* if (audio.ended) {
        console.log(1);
        activeBtn.classList.add('pause');
        currentTime.innerText = "00:00";
        audio.load();
    } */
}


/* async function test(audioItem) {
    let interval = null;
    await new Promise(resolve => {
        interval = setInterval(() => {
            currentTime.innerText = getTime(audioItem.currentTime);
        }, 1000);
        resolve();
        activeBtn.classList.add('pause');
        currentTime.innerText = "00:00";
    });
} */

nextBtn.addEventListener('click', () => {
    songCount = ++songCount >= songsList.length ? 0 : songCount;
    createAudio(songsList[songCount]);
})

prevBtn.addEventListener('click', () => {
    songCount = --songCount < 0 ? songsList.length - 1 : songCount;
    createAudio(songsList[songCount]);
})






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

