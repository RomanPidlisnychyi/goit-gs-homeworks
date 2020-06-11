const ingredients = [
    'Картошка',
    'Грибы',
    'Чеснок',
    'Помидоры',
    'Зелень',
    'Приправы',
];

const ingredientsRef = document.querySelector('#ingredients');



const item = ingredients.map(el => {
    const li = document.createElement('li');
    li.textContent = el;
    return li;
});

ingredientsRef.append(...item);