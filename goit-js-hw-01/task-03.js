const ADMIN_PASSWORD = 'jqueryismyjam';
let massage;
massage = prompt('Введите пароль');
if (massage === ADMIN_PASSWORD) {
    alert('Добро пожаловать!');
} else if (massage === null) {
    alert('Отменено пользователем!');
} else {
    alert('Доступ запрещен, неверный пароль!');
}