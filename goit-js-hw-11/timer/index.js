class CountdownTimer {
    constructor(selector, targetDate) {
        this.selector = selector;
        this.targetDate = targetDate;
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
          </div>`;
    }
    isertTimetToDOM() {
        const wrap = document.querySelector('.wrap');
        wrap.insertAdjacentHTML('beforeend', this.createTimerHTML());
    }
    run() {
        window.addEventListener('DOMContentLoaded', this.setTimer(this));
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

const countdownTimer = new CountdownTimer('#timer-1', 'July 17, 2020');
countdownTimer.run();

const countdownTimer1 = new CountdownTimer('#timer-2', 'February 23, 2021');
countdownTimer1.run();