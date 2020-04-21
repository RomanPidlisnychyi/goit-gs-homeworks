let input;
const numbers = [];
let total = 0;

do {
    input = prompt('Введите число:');
    if (Number(input) > 0) {
        numbers.push(Number(input));
    }
} while (input !== null);

for (let number of numbers) {
    console.log(number);
    total += number;
}
console.log(total);