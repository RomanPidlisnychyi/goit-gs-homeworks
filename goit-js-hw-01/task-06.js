let input;
let total = 0;
do {
    input = prompt('Введите число:');
    if (input === null) {
        alert(`Общая сумма чисел равна ${total}`);
        break;
    } else {
        total += input = Number(input);
    }
} while (input !== null);