const formatString = function(string) {
    const maxLength = 40;
    if (string.length > maxLength) {
        let difference = string.length - (maxLength - 1);

        let arrLetters = string.split('');
        arrLetters.splice(maxLength - 1, difference, '...');

        let newString = `${arrLetters.join('')}`;

        return newString;
    }
    return string;
};

console.log(formatString('Curabitur ligula sapien, tincidunt non.'));

console.log(formatString('Vestibulum facilisis, purus nec pulvinar iaculis.'));

console.log(formatString('Curabitur ligula sapien.'));

console.log(
    formatString(
        'Nunc sed turpis. Curabitur a felis in nunc fringilla tristique.',
    ),
);