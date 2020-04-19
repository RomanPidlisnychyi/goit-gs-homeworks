const credits = 23580;
const pricePerDroid = 3000;
let userChoice;
userChoice = prompt('Какое количество дронов вы хотите купить?');
if (userChoice === null) {
    console.log('Отменено пользователем!');
} else if (userChoice * pricePerDroid > credits) {
    console.log('Недостаточно средств на счету!');
} else if (userChoice * pricePerDroid <= credits) {
    console.log(
        `Вы купили ${userChoice} дроидов, на счету осталось ${
      credits - userChoice * pricePerDroid
    } кредитов.`,
    );
} else {
    console.log('Вы ввели недопустимое значение!');
}