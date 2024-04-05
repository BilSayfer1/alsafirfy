const music_arr = [
    {
        id: 1,
        name: "Это-любовь",
        url: "./mp3/Этолюбовь.mp3",
        artist: "Скриптонит",
        duration: "4:39",
    },
    {
        id: 2,
        name: "Где ты теперь",
        url: "./mp3/HammAli   Navai - Где ты теперь и с кем.mp3",
        artist: "HammAli   Navai",
        duration: "3:25",
    },
    {
        id: 3,
        name: "Surround Sound",
        url: "./mp3/J.I.D - Surround Sound (feat. COCONA from XG) Remix.mp3",
        artist: "J.I.D",
        duration: "2:48",
    },
    {
        id: 4,
        name: "По сути",
        url: "./mp3/JANAGA — По сути (Official Mood Video).mp3",
        artist: "JANAGA",
        duration: "2:23",
    },
    {
        id: 5,
        name: "Кино",
        url: "./mp3/MACAN - Кино.mp3",
        artist: "MACAN",
        duration: "3:04",
    },
    {
        id: 6,
        name: "IVL",
        url: "./mp3/MACAN & SCIRENA - IVL.mp3",
        artist: "MACAN & SCIRENA",
        duration: "3:20",
    },
    {
        id: 7,
        name: "satana",
        url: "./mp3/satana.mp3",
        artist: "satana",
        duration: "3:19",
    },
    {
        id: 8,
        name: "Султон",
        url: "./mp3/Абдулло - Султон.mp3",
        artist: "Абдулло",
        duration: "3:41",
    },
    {
        id: 9,
        name: "Положение",
        url: "./mp3/Скриптонит - Положение.mp3",
        artist: "Скриптонит",
        duration: "4:42",
    },
   
]

const cont = document.querySelector('tbody')
const audio = document.querySelector('audio')
const player = document.querySelector('.player')
let plus = document.querySelector('#plus')
let minus = document.querySelector('#minus')
let isPlaying = false
let prev = null

const audio_anim = ` <dotlottie-player class="anim" src="https://lottie.host/ce20256a-3044-45f0-80b7-a30c6a58b50d/UJ4fg8gB9X.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>`

reload(music_arr, cont)
function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        const tr = document.createElement('tr')
        const idx = document.createElement('td')
        const title = document.createElement('td')
        const artist = document.createElement('td')
        const date_song = document.createElement('td')
        const actions = document.createElement('td')
        const duration = document.createElement('span')
        const img = document.createElement('img')

        idx.innerHTML = arr.indexOf(item) + 1
        title.innerHTML = item.name
        artist.innerHTML = item.artist
        date_song.innerHTML = "1 day ago"
        duration.innerHTML = item.duration

        img.src = "./heart.svg"

       

        actions.append(img, duration)
        tr.append(idx, title, artist, date_song, actions,)
        place.append(tr)

        idx.onclick = () => {
            if (isPlaying && item.id === +audio.id) {
                idx.innerHTML = arr.indexOf(item) + 1
                audio.pause()
                isPlaying = false
            } else {
                if(prev) prev.idx.innerHTML = prev.num 
                audio.id = item.id
                audio.src = item.url
                audio.play()
                idx.innerHTML = audio_anim
                prev = {idx, num: arr.indexOf(item) + 1}
                isPlaying = true
            }
        }
    }
}

audio.onended = () => {
    let sond = music_arr[prev.num - 1]
    console.log('ended');
    audio.src = sond.url
    sond.play()
}

const playBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')


playBtn.onclick = () => {
    audio.play()
}
pauseBtn.onclick = () => {
    audio.pause()
}

const seekBar = document.querySelector('#seek_slider');

audio.ontimeupdate = function() {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
};

seekBar.addEventListener('input', function() {
    const seekPosition = parseFloat(seekBar.value) / 100;
    audio.currentTime = audio.duration * seekPosition;
});

audio.onended = () => {
    if (prev && prev.num < music_arr.length) {
        let nextSong = music_arr[prev.num];
        audio.src = nextSong.url;
        audio.play();
        prev.idx.innerHTML = prev.num + 1;
        prev = {idx: prev.idx, num: prev.num + 1};
        prev.idx.innerHTML = audio_anim;
    } else {
        audio.pause();
        isPlaying = false;
    }
};

plus.onclick = () => {
    if (prev && prev.num < music_arr.length) {
        let nextSong = music_arr[prev.num];
        audio.src = nextSong.url;
        audio.play();
        prev.idx.innerHTML = prev.num + 1;
        prev = {idx: prev.idx, num: prev.num + 1};
        prev.idx.innerHTML = audio_anim;
    }
};

minus.onclick = () => {
    if (prev && prev.num > 1) {
        let prevSong = music_arr[prev.num - 2];
        audio.src = prevSong.url;
        audio.play();
        prev.idx.innerHTML = prev.num - 1;
        prev = {idx: prev.idx, num: prev.num - 1};
        prev.idx.innerHTML = audio_anim;
    }
};
// function playTrack(data) {
//     console.log(data);
//     data = JSON.parse(data)
//     audio.src = data.url
//     audio.play()
// }
