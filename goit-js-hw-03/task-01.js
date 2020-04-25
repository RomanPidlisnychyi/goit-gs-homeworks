const user = {
    name: 'Mango',
    age: 20,
    hobby: 'html',
    premium: true,
};

user.mood = 'happy';
user.hobby = 'skydiving';
user.premium = false;


const userSetings = function(someUser) {
    const keys = Object.keys(someUser);

    for (let key of keys) {
        console.log(`${key}:${someUser[key]}`);
    }

}

console.log(userSetings(user));