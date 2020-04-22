let input;
const numbers = [];
let total = 0;

do {
    input = prompt('Введите число:');
    const userNumber = Number(input);
    if (userNumber > 0) {
        numbers.push(userNumber);
    }
} while (input !== null);

for (let number of numbers) {
    console.log(number);
    total += number;
}
console.log(total);