const Transaction = {
    DEPOSIT: 'deposit',
    WITHDRAW: 'withdraw',
};

const { DEPOSIT, WITHDRAW } = Transaction;

const account = {
    balance: 0,
    transactions: [],
    createTransaction(amount, type) {
        let id = 100500 + this.transactions.length;
        this.transactions.push({ amount, type, id });
    },
    deposit(amount) {
        this.balance += amount;
        this.createTransaction(amount, DEPOSIT);
    },
    withdraw(amount) {
        this.balance -= amount;
        this.createTransaction(amount, WITHDRAW);
    },
    getBalance() {
        return `Balance: ${this.balance}`;
    },
    getTransactionDetails(id) {
        for (const transaction of this.transactions) {
            if (id === transaction.id) {
                console.log('Transactoin For Id:');
                console.log(transaction);
            }
        }
    },
    getTransactionTotal(type) {
        let totalAmount = 0;
        for (const transaction of this.transactions) {
            if (type === transaction.type) {
                totalAmount += transaction.amount;
            }
        }
        console.log(`Total ${type}: ${totalAmount}`);
    },
};

console.log(account.deposit(500));
console.log(account.withdraw(300));

console.log(account.deposit(300));
console.log(account.withdraw(200));

console.log(account.deposit(200));
console.log(account.withdraw(100));

console.log(account.getTransactionTotal(DEPOSIT));

console.log(account.getTransactionTotal(WITHDRAW));

console.log(account.getTransactionDetails(100501));

console.log(account.getBalance());

console.log(account.transactions);