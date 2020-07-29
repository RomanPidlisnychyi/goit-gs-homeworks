class CountdownTimer {
    constructor(selector, targetDate) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.isRaning = true;
        this.days = Math.floor(this.genarateTime() / (1000 * 60 * 60 * 24));
        this.hours = this.pad(
            Math.floor(
                (this.genarateTime() % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
        );
        this.mins = this.pad(
            Math.floor((this.genarateTime() % (1000 * 60 * 60)) / (1000 * 60)),
        );
        this.secs = this.pad(
            Math.floor((this.genarateTime() % (1000 * 60)) / 1000),
        );
    }
    createTimerHTML() {
        return `<div class="timer" id="${this.selector}">
            <div class="field">
            <span class="value" data-value="days-${this.selector}">${this.days}</span>
              <span class="label">Days</span>
            </div>

            <div class="field">
              <span class="value" data-value="hours-${this.selector}">${this.hours}</span>
              <span class="label">Hours</span>
            </div>

            <div class="field">
              <span class="value" data-value="mins-${this.selector}">${this.mins}</span>
              <span class="label">Minutes</span>
            </div>

            <div class="field">
              <span class="value" data-value="secs-${this.selector}">${this.secs}</span>
              <span class="label">Seconds</span>
            </div>
            <button type="button" name="close" class="close__timer__button" data-close="${this.selector}"></button>
          </div>`;
    }
    isertTimetToDOM() {
        if (this.isRaning) {
            const wrap = document.querySelector('.wrap');
            wrap.insertAdjacentHTML('beforeend', this.createTimerHTML());
        }
    }
    run() {
        this.isRaning = true;
        window.addEventListener('DOMContentLoaded', this.setTimer(this));
    }
    stop() {
        this.isRaning = false;
        window.removeEventListener('DOMContentLoaded', this.setTimer(this));
        const wrap = document.querySelector('.wrap');
        wrap.removeChild(wrap.querySelector(`#${this.selector}`));
    }

    genarateTime() {
        const finishedTimerDate = Date.parse(this.targetDate);

        const currentDate = Date.now();

        const time = finishedTimerDate - currentDate;

        if (finishedTimerDate < currentDate) {
            return 0;
        }
        return time;
    }

    setTimer() {
        this.isertTimetToDOM();
        setInterval(() => {
            this.apdateClockFace(this.genarateTime());
        }, 1000);
    }
    apdateClockFace(time) {
        if (!this.isRaning) {
            return;
        }
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );

        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        this.days = document.querySelector(
            `span[data-value="days-${this.selector}"]`,
        );
        this.days.textContent = days;

        this.hours = document.querySelector(
            `span[data-value="hours-${this.selector}"]`,
        );
        this.hours.textContent = hours;

        this.mins = document.querySelector(
            `span[data-value="mins-${this.selector}"]`,
        );
        this.mins.textContent = mins;

        this.secs = document.querySelector(
            `span[data-value="secs-${this.selector}"]`,
        );
        this.secs.textContent = secs;
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const refs = {
    wrap: document.querySelector('.wrap'),
    control: document.querySelector('.control'),
    timerNameInput: document.querySelector('input[data-action="name"]'),
    timerDateInput: document.querySelector('input[data-action="date"]'),
    createTimerBtn: document.querySelector('button[data-action="create"]'),
};

refs.wrap.addEventListener('click', onControlClick);
refs.control.addEventListener('input', onControlInput);

const timers = [];
const timer = {};

function onControlClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }

    if (event.target === refs.createTimerBtn) {
        const newTimer = new CountdownTimer(`${timer.name}`, `${timer.value}`);
        newTimer.run();
        refs.timerNameInput.value = '';
        refs.timerDateInput.value = '';
        refs.createTimerBtn.disabled = true;
        timers.push(newTimer);
    }

    if (event.target !== refs.createTimerBtn) {
        timers.forEach((e, i) => {
            if (e.selector === event.target.dataset.close) {
                e.stop();
                timers.splice(i, 1);
            }
        });
    }
}

function onControlInput(event) {
    let timerIdExist = false;

    const timersId = refs.wrap.querySelectorAll('.timer');

    timersId.forEach(e => {
        if (e.id === refs.timerNameInput.value) {
            timerIdExist = true;
        } else {
            timerIdExist = false;
        }
    });

    if (event.target === refs.timerNameInput) {
        timer.name = event.target.value;
    }

    if (event.target === refs.timerDateInput) {
        timer.value = event.target.value;
    }

    if (!refs.timerNameInput.validity.valid ||
        refs.timerNameInput.value === '' ||
        Date.parse(refs.timerDateInput.value) < Date.now() ||
        timerIdExist
    ) {
        refs.createTimerBtn.disabled = true;
    }

    if (
        refs.timerNameInput.validity.valid &&
        refs.timerNameInput.value !== '' &&
        Date.parse(refs.timerDateInput.value) > Date.now() &&
        !timerIdExist
    ) {
        refs.createTimerBtn.disabled = false;
    }
}