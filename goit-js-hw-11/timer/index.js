class CountdownTimer {
    constructor(selector, targetDate) {
        this.selector = selector;
        this.targetDate = targetDate;
    }
}

const countdownTimer = new CountdownTimer('#timer-1', 'July 17, 2020');

refs = {
    timer: document.querySelector('#timer-1'),
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
};

window.addEventListener('DOMContentLoaded', setTimer(countdownTimer));

function setTimer(obj) {
    setInterval(() => {
        const finishedTimerDate = Date.parse(obj.targetDate);

        const currentDate = Date.now();

        const time = finishedTimerDate - currentDate;

        if (finishedTimerDate < currentDate) {
            return;
        }

        apdateClockFace(time);
    }, 1000);
}

function apdateClockFace(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    const hours = pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
}

function pad(value) {
    return String(value).padStart(2, '0');
}