let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let mainimg = document.getElementById('mainimg')
let myprogressbar = document.getElementById('myprogressbar')
let musicOn = false;

let songs = [
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },
    { SongName: "Agar Tum Sath Ho...", filepath: "songs/1.mp3", coverpath: "image/1.png", },

]

masterplay.addEventListener('click', () => {

    //  condition for play pause button
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle')
        musicOn = true;
        rotateImg(musicOn);
    }
    else {
        audioElement.pause();
        masterplay.classList.add('fa-play-circle')
        masterplay.classList.remove('fa-pause-circle')
        musicOn = false;
        rotateImg(musicOn);
    }

})

const rotateImg = (musicOn)=>{
//   condition for img rotate
let imgEffect = document.getElementById("mainimg");
 if (musicOn == false) {
    imgEffect.style.animationPlayState = "paused"
  
}
else{
    imgEffect.style.animationPlayState = "running"
}
}
audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;

 if(audioElement.play && progress==100){
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
