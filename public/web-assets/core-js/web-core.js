let currentStatus = 'Closed';
let playingStatus = false;

const toggleStream = document.getElementById('app-play-stream');
const streamVolume = document.getElementById('app-stream-vol');

const streamAudio = new Audio('https://ec3.yesstreaming.net:3030/stream')

toggleStream.addEventListener('click', loadStream);
streamVolume.addEventListener('input', setVolume());
document.addEventListener('DOMContentLoaded', contentLoaded);

function toggleMobileMenu () {
    let mobileMenu = document.getElementById('nav-mobile-fs');
    let mobileIcon = document.getElementById('nav-menuico');
    if (currentStatus == 'Closed') {
        mobileMenu.style.display = 'flex';
        mobileMenu.style.animation = "fsFadeIn 1s normal";
        mobileIcon.className = "fa fa-x";
        currentStatus = 'Opened';
    } else {
        mobileMenu.style.animation = "fsFadeOut 0.5s normal";
        setTimeout(function() {
            mobileMenu.style.display = 'none';
        }, 450);
        mobileIcon.className = "fa fa-bars";
        currentStatus = 'Closed';
    }
}

function contentLoaded() {
    console.log('%c[contentLoaded]:%c Successfully loaded ' + window.location, 'font-weight: bold; color: lime;', '');
    if (localStorage.getItem('currentVolume') == null) {
        console.log('%c[INFO]:%c No previous currentVolume item was set, setting default to 0.5', 'font-weight: bold; color: orange;', '');
        localStorage.setItem('currentVolume', '0.5');
        console.log('%cPlease only continue if you know what your doing, or see /for-the-developers for developer resources.%c ', 'font-weight: bold; color: lime;', '');
    };
    setVolume(localStorage.getItem('currentVolume'));
    

}

function loadStream() {
    if (playingStatus) {
        streamAudio.pause();
        toggleStream.innerHTML = "<i class='fa fa-play'></i> Listen to Stream";
        console.log('%c[WebStream]:%c Sending .pause() to stream audio element.', 'font-weight: bold; color: skyblue;', '');
        playingStatus = false;
        console.log('%c[WebStream]:%c Dispatched .pause() successfully.', 'font-weight: bold; color: skyblue;', '');
    } else {
        playingStatus = true;
        console.log('%c[WebStream]:%c Sending .play() to stream audio element.', 'font-weight: bold; color: skyblue;', '');
        streamAudio.play();
        toggleStream.innerHTML = "<i class='fa fa-pause'></i> Pause Stream";
        console.log('%c[WebStream]:%c Dispatched .play() successfully.', 'font-weight: bold; color: skyblue;', '');
    }
}

function setVolume(value) {

}

// Async functions are controlled in a seperate javascript file. 
// If you are a developer, please look in /web-assets/core-js/ 
// for the async functions file.
