const credits = 23580;
const pricePerDroid = 3000;
let userChoice;
userChoice = prompt('Какое количество дронов вы хотите купить?');
let totalPrice = +userChoice * pricePerDroid;
if (userChoice === null) {
    console.log('Отменено пользователем!');
} else if (totalPrice > credits) {
    console.log('Недостаточно средств на счету!');
} else if (totalPrice <= credits) {
    console.log(
        `Вы купили ${userChoice} дроидов, на счету осталось ${
      credits - totalPrice
    } кредитов.`,
    );
} else {
    console.log('Вы ввели недопустимое значение!');
}