const boxesRef = document.querySelector('#boxes');

const inputRef = document.querySelector('[type=number]');

const renderButtonRef = document.querySelector('[data-action=render]');

const destroyButtonRef = document.querySelector('[data-action=destroy]');

const boxContainer = [];

renderButtonRef.addEventListener('click', onClickRender);

destroyButtonRef.addEventListener('click', onClickDestroy);

function onClickRender() {
    let value = 30;
    for (let i = 1; i <= inputRef.value; inputRef.value -= 1) {
        const renderBoxRef = document.createElement('div');
        renderBoxRef.classList.add('box');
        renderBoxRef.style.width = `${value}px`;
        renderBoxRef.style.height = `${value}px`;
        renderBoxRef.style.border = '1px solid #ccc';
        renderBoxRef.style.backgroundColor = `${get_random_color()}`;
        value += 10;
        boxContainer.push(renderBoxRef);
    }

    console.log(boxContainer);

    boxContainer.forEach((element, index, array) => {
        console.log(element);
        console.log(index);
        console.log(array);
        if (index + 1 < array.length) {
            boxesRef.appendChild(array[index + 1]);
            array[index + 1].appendChild(element);
        }
    });
}

// function onClickRender() {
//     let number = Number(inputRef.value);
//    console.log(createBoxes(number));
// }

// function createBoxes(n) {
//     const initSize = 30;
//     const step = 10;
//     const boxes = Array(n)
//     .fill('')
//     .map(
//     (e, i, arr) =>
//     `<div style="width: ${initSize +
//     step * i}px; height: ${initSize +
//     step * i}px; background-color: ${get_random_color()};"></div>`
//     );
//     console.log(boxes);

//     boxes.forEach((element, index, array) => {
//         console.log(element);
//         console.log(index);
//         console.log(array);

//         if (index + 1 < array.length) {
//             boxesRef.appendChild(array[index + 1]);
//             array[index + 1].appendChild(element);
//         }
//     });
//     }

function onClickDestroy() {
    boxContainer.length = 0;
    boxesRef.removeChild(boxesRef.firstElementChild);
}

function get_random_color() {
    let color = '';
    for (var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += sub.length == 1 ? '0' + sub : sub;
    }
    return '#' + color;
}