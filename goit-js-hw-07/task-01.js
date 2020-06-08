const itemsRef = document.querySelectorAll('.item');

function catalogList() {
    console.log(`В списке ${itemsRef.length} категории`);
    itemsRef.forEach((value, key) => {
        console.log(`Категория: ${itemsRef[key].children[0].textContent}`);
        console.log(
            `Количество элементов: ${itemsRef[key].children[1].childElementCount}`,
        );
    });
}

console.log(catalogList());