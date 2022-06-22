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
let allSongsG = []
let download_music= document.getElementById('download_music');

download_music.addEventListener('click', ()=> {
    download_music.href= `songs/${songindex + 1}.mp3`;
    download_music.setAttribute('download', SongName);
    download_music.download=`songs/${songindex + 1}.mp3`;
    // alert("You Dont have Subscription....")
    })

const fetchSongs = async () => {

    // fetch the song playlist

    const playlist = await fetch('./songApi/songsPlaylists.json')
    const allPlaylist = await playlist.json()
    let playlists = "";
    allPlaylist.map((playlist) => {
        playlists += `
           <div class="card">
           <a href=""><i class="fa-solid fa-play"></i></a>
           <img src=${playlist.img}
               alt="" class="playlistimg">
           <p class="playlistname">${playlist.name}</p>
           <p class="followersNum">${playlist.users} Followers</p>
       </div>`
    })

    const playlistContainer = document.getElementById('cardbody');
    // playlistContainer.innerHTML = playlists

    // fetch the songs

    const res = await fetch('./songApi/songs.json')
    const fetchedSongs = await res.json()
    allSongsG = fetchedSongs
   console.log(allSongsG)
    let list = "";
     fetchedSongs.map((song,index) => {
         list += `
         <div class="songitem"    style="background:${song.background} ;">
         <img src=${song.coverpath} alt="agar tum sath ho">
            <span class="name">${song.SongName}</span>
            <span class="songlistplay">
                <span class="songTime">${song.time}</span>
                <i class="far fa-play-circle songitemplay ${index}" onClick="rohit()"></i>
          
            </span>
        </div>`
    })
          // onClick="makeAllplays(${index})"

    const div = document.getElementById("options");
    div.innerHTML = list


}
fetchSongs();
// songitem.forEach((element, i) => {
//     element.getElementsByTagName("img")[0].src = songs[i].coverpath;
//     element.getElementsByClassName("name")[0].innerHTML = songs[i].SongName;
// });

//  changing the menu btn to cross btn

const menuBtnClick = () => {
    const aside = document.getElementById("aside");
    aside.style.top = "50%";
    document.body.style.backdropFilter = "blur(5px)";
    container.style.filter = "blur(4px)";
    // console.log(window.pageYOffset)

    if (window.pageYOffset > 0) {
        const ele = document.getElementById("cardbody");
        window.scroll(0, 0)
        // console.log(document.body.scrollTop >= 0)

    }
}

//  close the playlist div
const closeBtnClick = () => {
    const aside = document.getElementById("aside");
    const container = document.getElementById("container");
    aside.style.top = "-120%";
    document.body.style.backdropFilter = "blur(1px)";
    container.style.filter = "blur(0px)";

}
//  like btn animation 
const likeBtn = () => {
    const likebtn = document.getElementById("likeBtn");
    if (likebtn.classList.contains("fa-regular")) {
        likebtn.classList.add("fa-solid")
        likebtn.classList.remove("fa-regular")
    }
    else {
        likebtn.classList.add("fa-regular")
        likebtn.classList.remove("fa-solid")

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

const makeAllplays = (index) => {
    // console.log(index);
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        // console.log(element)
        element.addEventListener('click', (ele) => {
            // console.log(ele.target)
        })

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
const rohit = ()=>{

Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(element);
        e.target.classList.contains("fa-pause-circle") ? (e.target.classList.add("fa-play-circle"), e.target.classList.remove("fa-pause-circle")) : (e.target.classList.remove("fa-play-circle"), e.target.classList.add("fa-pause-circle"))

        makeAllplays();
        songindex = parseInt(e.target.id);
        // e.target.classList.remove("fa-play-circle");
        // e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songindex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove("fa-play-circle")
        masterplay.classList.add("fa-pause-circle")
        mainimg.src = `image/${songindex + 1}.png`;
        mainsong.innerHTML = songs[songindex].SongName
        // box.style.background = `${}`

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
}

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
// animation of main box 
const activeBox = () => {
    // window.scroll(0,0);
    const box = document.getElementById("box");
    const home = document.getElementById("home");
    const row = document.getElementById("row");

    if (box.classList.contains("box")) {
        window.scroll(0, 0)
        box.classList.add("activeBox")
        box.classList.remove("box")
        home.style.filter = "blur(5px)"
        row.style.top = "-10px";

    }
    else {
        box.classList.remove("activeBox")
        box.classList.add("box")
        home.style.filter = "blur(0px)";
        row.style.top = "-73px";

    }
}

//  search songs 

const searchSongs = () => {
      let li= allSongsG
      const input = document.getElementById('input');
      const showDiv = document.getElementById('homeCards');
      let list = ""
            // input.addEventListener('keyup',(e)=>{
                   let input_value = input.value.toUpperCase();

          for (i = 0; i < li.length; i++) { 
            if (!li[i].SongName.toUpperCase().includes(input_value)) {
                // li[i].style.display="none";
                // list += `<h1>no any song found related search</h1>`
            }
            else {
                // li[i].style.display="list-item";        
                console.log(li[i]);  
                list +=`<div class="card">
                <a href=""><i class="fa-solid fa-play"></i></a>
                <img src=${li[i].coverpath}
                    alt="" class="playlistimg">
                <p class="playlistname">${li[i].SongName}</p>
                <p class="followersNum">${li[i].time}</p>
            </div>`       
            }
        }
        showDiv.innerHTML=list
// })
}

// animated gif remaining



