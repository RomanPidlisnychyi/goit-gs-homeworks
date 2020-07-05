const refs = {
    startBtn: document.querySelector('button[data-action="start"]'),
    stopBtn: document.querySelector('button[data-action="stop"]'),
    body: document.querySelector('body'),
};

refs.body.dataset.action = false;

const colors = [
    '#FFFFFF',
    '#2196F3',
    '#4CAF50',
    '#FF9800',
    '#009688',
    '#795548',
];

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

let timerId;

refs.body.addEventListener('click', event => {
    if (event.target === refs.startBtn) {
        onStart();
    }
    if (event.target === refs.stopBtn) {
        onStop();
    }
});

function onStart() {
    if (refs.body.dataset.action === 'true') {
        return;
    }

    refs.body.dataset.action = true;

    timerId = setInterval(() => {
        const indexOurColor = randomIntegerFromInterval(0, colors.length - 1);
        refs.body.style.backgroundColor = colors[indexOurColor];
    }, 1000);
}

function onStop() {
    clearInterval(timerId);
    refs.body.dataset.action = false;
}