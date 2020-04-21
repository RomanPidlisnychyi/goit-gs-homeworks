const formatString = function(string) {
    if (string.length > 40) {
        let difference = string.length - 39;

        let arrLetters = string.split('');
        arrLetters.splice(39, difference, '...');

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