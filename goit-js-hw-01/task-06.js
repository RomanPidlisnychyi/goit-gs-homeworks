let input;
let total = 0;
input = prompt(calculate());

function calculate() {
    input = prompt('Введите число');
    if (input !== null) {
        total += input = Number(input);
        return calculate();
    } else {
        alert(`Общая сумма чисел равна ${total}`);
    }
}