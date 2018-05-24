/* Get elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');
const fullSceen = player.querySelector('.screen');

/* Build out functions */

function togglePlay(){
    //video[video.paused? 'play' : 'pause']();
    if (video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateButton(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(){
    video.currentTime +=  parseFloat(this.dataset.skip);
}

function handleRandUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function sizeScreen(){
    console.log(`Full screen flag = ${fullScreenFlag}`);
    if (!fullScreenFlag) {
        player.style.width = '100%';
        player.style.height = '100%';
        fullScreenFlag = !fullScreenFlag;
    }
    else{
        player.style.width = '750px';
        fullScreenFlag = !fullScreenFlag;
    }

}
/* Hook up the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRandUpdate));

let mouseDown = false;
let fullScreenFlag = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
fullSceen.addEventListener('click', sizeScreen);