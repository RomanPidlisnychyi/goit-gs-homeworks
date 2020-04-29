const findBestEmployee = function(employees) {
    console.log(employees);

    let mostTasks = 0;
    let bestEmployee;

    for (const [key, value] of Object.entries(employees)) {
        if (mostTasks < value) {
            mostTasks = value;
        }

        if (value === mostTasks) {
            bestEmployee = key;
        }
    }

    return bestEmployee;
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