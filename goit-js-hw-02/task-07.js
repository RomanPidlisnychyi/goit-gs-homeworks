const logins = ['Lucky', 'Bers', 'Pix', 'Max'];

const isLoginValid = function(login) {
    return login.length > 3 && login.length <= 16;
};

const isLoginUnique = function(allLogins, login) {
    return allLogins.includes(login);
};

const addLogin = function(allLogins, login) {
    isLoginValid(login);
    if (!isLoginValid(login)) {
        return 'Ошибка! Логин должен быть от 4 до 16 символов';
    }
    isLoginUnique(allLogins, login);
    if (isLoginUnique(allLogins, login)) {
        return console.log('Такой логин уже используется!');
    }
    allLogins.push(login);
    return 'Логин успешно добавлен!';
};

console.log(logins);

console.log(addLogin(logins, 'Kiwi'));

console.log(logins);

console.log(addLogin(logins, 'Lucky'));

console.log(logins);