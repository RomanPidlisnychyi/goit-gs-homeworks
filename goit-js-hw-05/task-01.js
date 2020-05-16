const Account = function(login, email) {
    this.login = login;
    this.email = email;
};

Account.prototype.getInfo = function() {
    return `Login: ${this.login}, Email: ${this.email}`;
};

const mango = new Account('Mango', 'mango@dog.woof');
console.log(mango.getInfo());

const poli = new Account('Poli', 'poli@mail.com');
console.log(poli.getInfo());