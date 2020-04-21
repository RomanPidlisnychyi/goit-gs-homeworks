const names = ['Mango', 'Poly', 'Ajax', 'Lux', 'Jay', 'Kong'];
const nambers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const logItems = function(array) {
    let tag = '-';
    let logItemsWithTag = [];

    for (let i = 0; i < array.length; i += 1) {
        array[i] = `${i + 1} ${tag} ${array[i]}`;
    }

    logItemsWithTag.push(array);
    return logItemsWithTag;
};

console.log(logItems(names));
console.log(logItems(nambers));