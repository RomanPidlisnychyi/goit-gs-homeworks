const products = [
    { name: 'Радар', price: 1300, quantity: 4 },
    { name: 'Сканер', price: 2700, quantity: 3 },
    { name: 'Дроид', price: 400, quantity: 7 },
    { name: 'Захват', price: 1200, quantity: 2 },
];

const getAllPropValues = function(arr, prop) {
    let indexOfFindProp;
    let result = [];

    for (let i of arr) {
        const keys = Object.keys(i);
        for (const key of keys) {
            if (prop === key) {
                indexOfFindProp = keys.indexOf(key);
            }
        }
        const values = Object.values(i);
        if (indexOfFindProp >= 0) {
            result.push(values[indexOfFindProp]);
        }
    }
    return result;
};

console.log(getAllPropValues(products, 'name'));

console.log(getAllPropValues(products, 'quantity'));

console.log(getAllPropValues(products, 'category'));