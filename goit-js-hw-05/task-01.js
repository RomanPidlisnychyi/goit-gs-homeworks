const Account = function({ login, email }) {
    this.login = login;
    this.email = email;
};

Account.prototype.getInfo = function() {
    return `Login: ${this.login}, Email: ${this.email}`;
};

const mango = new Account({ login: 'Mangozedog', email: 'mango@dog.woof' });
console.log(mango.getInfo());

const poli = new Account({ login: 'Poli', email: 'poli@mail.com' });
console.log(poli.getInfo());