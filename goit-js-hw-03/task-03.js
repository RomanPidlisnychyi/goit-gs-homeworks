const findBestEmployee = function(employees) {
    console.log(employees);

    const keys = Object.keys(employees);
    // console.log(keys);

    const values = Object.values(employees);
    // console.log(values);

    let mostTasks = 0;
    let indexOfBestEmploy;

    for (let value of values) {
        if (mostTasks <= value) {
            mostTasks = value;
        }
        if (value === mostTasks) {
            indexOfBestEmploy = values.indexOf(value);
        }
    }

    console.log(mostTasks);
    console.log(indexOfBestEmploy);
    console.log(keys[indexOfBestEmploy]);
};

const firstEmployeesTeam = {
    ann: 29,
    david: 35,
    helen: 1,
    lorence: 99,
};

const secondEmployeesTeam = {
    poly: 12,
    mango: 17,
    ajax: 4,
};

const thirdEmployeesTeam = {
    lux: 147,
    david: 21,
    kiwi: 19,
    chelsy: 38,
};

console.log(findBestEmployee(firstEmployeesTeam));

console.log(findBestEmployee(secondEmployeesTeam));

console.log(findBestEmployee(thirdEmployeesTeam));