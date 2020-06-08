const inputRef = document.querySelector('#validation-input');

inputRef.addEventListener('blur', onBlurInput);

inputRef.addEventListener('focus', onFocusInput);

function onBlurInput() {
    const dataLength = Number(inputRef.attributes[2].nodeValue);
    dataLength === inputRef.value.length ?
        inputRef.classList.add('valid') :
        inputRef.classList.add('invalid');
}

function onFocusInput() {
    inputRef.classList.remove('valid', 'invalid');
}