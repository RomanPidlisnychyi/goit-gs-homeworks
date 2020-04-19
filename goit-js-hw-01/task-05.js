let country = ['Китай', 'Чили', 'Австралия', 'Индия', 'Ямайка'];
let price;
let userChoice;
userChoice = prompt('Выберите страну доставки');
switch (userChoice.toLowerCase()) {
    case country[0].toLowerCase():
        price = 100;
        alert(`Доставка в ${country[0]} будет стоить ${price} кредитов`);
        break;
    case country[1].toLowerCase():
        price = 250;
        alert(`Доставка в ${country[1]} будет стоить ${price} кредитов`);
        break;
    case country[2].toLowerCase():
        price = 170;
        alert(`Доставка в ${country[2]} будет стоить ${price} кредитов`);
        break;
    case country[3].toLowerCase():
        price = 80;
        alert(`Доставка в ${country[3]} будет стоить ${price} кредитов`);
        break;
    case country[4].toLowerCase():
        price = 120;
        alert(`Доставка в ${country[4]} будет стоить ${price} кредитов`);
        break;
    default:
        alert('В вашей стране доставка не доступна');
}