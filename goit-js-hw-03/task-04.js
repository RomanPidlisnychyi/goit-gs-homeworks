const countTotalSalary = function(employees) {
    const values = Object.values(employees);
    let totalSalary = 0;

    for (const value of values) {
        totalSalary += value;
    }

    return totalSalary;
};

const firstTeamEmployeesSalary = {
    mango: 100,
    poly: 150,
    alfred: 80,
};

const secondTeamEmployeesSalary = {
    kiwi: 200,
    lux: 50,
    chelsy: 150,
};

console.log(countTotalSalary({}));

console.log(countTotalSalary(firstTeamEmployeesSalary));

console.log(countTotalSalary(secondTeamEmployeesSalary));