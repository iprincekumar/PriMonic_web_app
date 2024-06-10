console.log("Welcome to Your Music Player");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Chak Lein De", filePath: "songs/Chak.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dangal", filePath: "songs/Dangal.mp3", coverPath: "covers/2.jpg"},
    {songName: "Dhaakad", filePath: "songs/Dhaakad.mp3", coverPath: "covers/3.jpg"},
    {songName: "Kar Har Maidan", filePath: "songs/Kar.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kyu Tarasta", filePath: "songs/kyu.mp3", coverPath: "covers/5.jpg"},
    {songName: "Main Lad Jana", filePath: "songs/Main.mp3", coverPath: "covers/6.jpg"},
    {songName: "O Sikander", filePath: "songs/O.mp3", coverPath: "covers/7.jpg"},
    {songName: "Paagal Parindey", filePath: "songs/Paagal.mp3", coverPath: "covers/8.jpg"},
];

// Function to play selected song
const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
};

// Function to make all plays inactive
const makeAllPlays = () => {
    songItems.forEach((element) => {
        element.querySelector('.songItemPlay').classList.remove('fa-circle-pause');
        element.querySelector('.songItemPlay').classList.add('fa-circle-play');
    });
};

// Event listeners for play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Event listeners for song item click
songItems.forEach((element, i) => {
    element.addEventListener('click', () => {
        makeAllPlays();
        songIndex = i;
        element.querySelector('.songItemPlay').classList.remove('fa-circle-play');
        element.querySelector('.songItemPlay').classList.add('fa-circle-pause');
        playSong(songIndex);
    });
});

// Event listener for next button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0;
    }
    playSong(songIndex);
});

// Event listener for previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1;
    }
    playSong(songIndex);
});

// Event listener for time update
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Event listener for seekbar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
