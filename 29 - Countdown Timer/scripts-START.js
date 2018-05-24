let countDown;
const endTime = document.querySelector('.display__end-time');
const timerDisplay = document.querySelector('.display__time-left');
const timerControls = document.querySelectorAll('[data-time]');

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

timerControls.forEach(ctrl => ctrl.addEventListener('click', startTimer));

function startTimer(){
    timer( parseInt(this.dataset.time));
}
function timer(seconds){
    clearInterval(countDown);
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndtime(then);
    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0){
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}
function displayEndtime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours() > 12 ? end.getHours() - 12 : end.getHours();
    const minutes = end.getMinutes();
    const suffix = end.getHours() >= 12 ? 'pm' : 'am';
    endTime.textContent = `Be back at ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${suffix}`;
}

