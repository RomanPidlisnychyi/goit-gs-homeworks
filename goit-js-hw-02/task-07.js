const logins = ['Lucky', 'Bers', 'Pix', 'Max'];

const isLoginValid = function(login) {
    let loginValid = login.length > 3 && login.length <= 16;
    return loginValid;
};

const isLoginUnique = function(allLogins, login) {
    let unique = allLogins.includes(login);
    return unique;
};

const addLogin = function(allLogins, login) {
    isLoginValid(login);
    if (isLoginValid(login) === false) {
        return console.log('Ошибка! Логин должен быть от 4 до 16 символов');
    }
    isLoginUnique(allLogins, login);
    if (isLoginUnique(allLogins, login) === true) {
        return console.log('Такой логин уже используется!');
    }
    allLogins.push(login);
    return console.log('Логин успешно добавлен!');
};

console.log(logins);

console.log(addLogin(logins, 'Kiwi'));

console.log(logins);

console.log(addLogin(logins, 'Lucky'));

console.log(logins);