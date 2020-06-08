const inputRef = document.querySelector('#font-size-control');
console.dir(inputRef);

const spanRef = document.querySelector('#text');
console.dir(spanRef);

inputRef.addEventListener('change', onChangeInput);

function onChangeInput() {
    spanRef.style.fontSize = `${inputRef.value / 2}px`;
}