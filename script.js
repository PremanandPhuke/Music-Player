let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let mainimg = document.getElementById('mainimg')
let myprogressbar = document.getElementById('myprogressbar')
let musicOn = false;
let songitem = Array.from(document.getElementsByClassName('songitem'));
let imgEffect = document.getElementById("mainimg");
let box = document.getElementsByClassName('box')
let mainsong = document.getElementById('mainsong');

let songs = [{
    SongName: "Agar Tum Sath Ho...",
    filepath: "songs/1.mp3",
    coverpath: "image/1.png",
    background: " linear-gradient(white, rgb(214, 123, 3))"
},
{
    SongName: "Ye Raate Ye Mousam...",
    filepath: "songs/2.mp3",
    coverpath: "image/2.png",
    background: " linear-gradient(white, black)"

},
{
    SongName: "Lagja Gale...",
    filepath: "songs/3.mp3",
    coverpath: "image/3.png",
},
{
    SongName: "Ashka Na Ho Naina...",
    filepath: "songs/4.mp3",
    coverpath: "image/4.png",
},
{
    SongName: "Shayad...",
    filepath: "songs/5.mp3",
    coverpath: "image/5.png",
},
{
    SongName: "Nacho Nacho...",
    filepath: "songs/6.mp3",
    coverpath: "image/6.png",
},
{
    SongName: "Zalima...",
    filepath: "songs/7.mp3",
    coverpath: "image/7.png",
},
{
    SongName: "Tera Yaar Hu Main...",
    filepath: "songs/8.mp3",
    coverpath: "image/8.png",
},
{
    SongName: "Hain Apna Dil To Awara...",
    filepath: "songs/9.mp3",
    coverpath: "image/9.png",
},
{
    SongName: "Mere Liye Tum Kafi Ho...",
    filepath: "songs/10.mp3",
    coverpath: "image/10.png",
},

]

songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("name")[0].innerHTML = songs[i].SongName;
});

//  changing the menu btn ti cross

const menuBtnClick = () => {
    const menuBtn = document.getElementById("menu-btn");
const aside = document.getElementById("aside")

    if (menuBtn.classList.contains("fa-bars-staggered")) {
        menuBtn.classList.add("fa-rectangle-xmark");
        menuBtn.classList.remove("fa-bars-staggered")
        aside.style.left="0px"
    }
    else {
        menuBtn.classList.remove("fa-rectangle-xmark");
        menuBtn.classList.add("fa-bars-staggered");
        aside.style.left="-150%"
    }
}
masterplay.addEventListener('click', () => {

    //  condition for play pause button
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        musicOn = true;
        rotateImg(musicOn);
    } else {
        audioElement.pause();
        masterplay.classList.add('fa-play-circle')
        masterplay.classList.remove('fa-pause-circle')
        musicOn = false;
        rotateImg(musicOn);
    }

})

// const playpausegame= () =>{
//     if (audioElement.paused || audioElement.currentTime <= 0) {
//         audioElement.play();
//         masterplay.classList.remove('fa-play-circle')
//         masterplay.classList.add('fa-pause-circle')
//         musicOn = true;
//         rotateImg(musicOn);
//     } else {
//         audioElement.pause();
//         masterplay.classList.add('fa-play-circle')
//         masterplay.classList.remove('fa-pause-circle')
//         musicOn = false;
//         rotateImg(musicOn);
//     }
// }

const rotateImg = (musicOn) => {
    //   condition for img rotate

    if (musicOn == false) {
        imgEffect.style.animationPlayState = "paused"

    } else {
        imgEffect.style.animationPlayState = "running"
    }
}
audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;

    if (audioElement.play && progress == 100) {
        audioElement.pause();
        masterplay.classList.add('fa-play-circle')
        masterplay.classList.remove('fa-pause-circle')
        musicOn = false;
        rotateImg(musicOn);
    }
})

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
})

const makeAllplays = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle");

        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterplay.classList.remove('fa-play-circle')
            masterplay.classList.add('fa-pause-circle')
            musicOn = true;
            rotateImg(musicOn);
        } else {
            audioElement.pause();
            masterplay.classList.add('fa-play-circle')
            masterplay.classList.remove('fa-pause-circle')
            musicOn = false;
            rotateImg(musicOn);
        }
    })
}
Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songindex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove("fa-play-circle")
        masterplay.classList.add("fa-pause-circle")
        mainimg.src = `image/${songindex + 1}.png`;
        mainsong.innerHTML = songs[songindex].SongName


        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterplay.classList.remove('fa-play-circle')
            masterplay.classList.add('fa-pause-circle')
            musicOn = true;
            rotateImg(musicOn);
        } else {
            audioElement.pause();
            masterplay.classList.add('fa-play-circle')
            masterplay.classList.remove('fa-pause-circle')
            musicOn = false;
            rotateImg(musicOn);
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 9) {
        songindex = 0
    } else {
        songindex += 1;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove("fa-play-circle")
    masterplay.classList.add("fa-pause-circle")
    mainimg.src = `image/${songindex + 1}.png`;
    mainsong.innerHTML = songs[songindex].SongName

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        musicOn = true;
        rotateImg(musicOn);
    } else {
        audioElement.pause();
        masterplay.classList.add('fa-play-circle')
        masterplay.classList.remove('fa-pause-circle')
        musicOn = false;
        rotateImg(musicOn);
    }
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 9
    } else {
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove("fa-play-circle")
    masterplay.classList.add("fa-pause-circle")
    mainimg.src = `image/${songindex + 1}.png`;
    mainsong.innerHTML = songs[songindex].SongName

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        musicOn = true;
        rotateImg(musicOn);
    } else {
        audioElement.pause();
        masterplay.classList.add('fa-play-circle')
        masterplay.classList.remove('fa-pause-circle')
        musicOn = false;
        rotateImg(musicOn);
    }

})



