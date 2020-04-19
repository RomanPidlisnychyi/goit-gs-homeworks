let countrys = ['Китай', 'Чили', 'Австралия', 'Индия', 'Ямайка'];
let price = 0;
let userChoice;
let countryName;
userChoice = prompt('Выберите страну доставки');
countryName = userChoice[0].toUpperCase() + userChoice.slice(1).toLowerCase();
switch (countryName) {
    case countrys[0]:
        price = 100;
        break;
    case countrys[1]:
        price = 250;
        break;
    case countrys[2]:
        price = 170;
        break;
    case countrys[3]:
        price = 80;
        break;
    case countrys[4]:
        price = 120;
        break;
    default:
        alert('В вашей стране доставка не доступна');
}
if (price > 0) {
    alert(`Доставка в ${countryName} будет стоить ${price} кредитов`);
}