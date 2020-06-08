const inputRef = document.querySelector('[id=name-input]');
console.log(inputRef.value);

const spanRef = document.querySelector('[id=name-output]');

inputRef.addEventListener('input', () => {
    spanRef.textContent = inputRef.value === '' ? 'незнакомец' : inputRef.value;
});