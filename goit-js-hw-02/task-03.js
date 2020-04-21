const findLongestWord = function(string) {
    let arrWords = string.split(' ');
    let longestWord = arrWords[0];
    for (let i = 1; i < arrWords.length; i += 1) {
        if (longestWord.length < arrWords[i].length) {
            longestWord = arrWords[i];
        }
    }
    return longestWord;
};

console.log(findLongestWord('The quick brown fox jumped over the lazy dog'));

console.log(findLongestWord('Google do a roll'));

console.log(findLongestWord('May the force be with you'));