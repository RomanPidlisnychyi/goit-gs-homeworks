let counterValue = 0;

const valueRef = document.querySelector('#value');

const decrementRef = document.querySelector('[data-action=decrement]');
decrementRef.addEventListener('click', () => {
    valueRef.textContent = counterValue -= 1;
});

const incrementRef = document.querySelector('[data-action=increment]');
incrementRef.addEventListener('click', () => {
    valueRef.textContent = counterValue += 1;
});