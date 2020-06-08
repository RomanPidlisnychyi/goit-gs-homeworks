const ingredients = [
    'Картошка',
    'Грибы',
    'Чеснок',
    'Помидоры',
    'Зелень',
    'Приправы',
];

const ingredientsRef = document.querySelector('#ingredients');

const list = [];

function ingredientList(array) {
    array.forEach(element => {
        const ingredientRef = document.createElement('li');
        ingredientRef.textContent = element;
        list.push(ingredientRef);
        // ingredientsRef.appendChild(ingredientRef);
        // console.log(ingredientRef);
    });
}

ingredientList(ingredients);

// console.log(list);

ingredientsRef.append(...list);