'use strict';

const sum = (...args) => {
    let total = 0;
    for (let arg of args) total += parseFloat(arg);
    return total;
};

const multiply = (...args) => {
    let total = 1;
    for (let arg of args) total *= parseFloat(arg);
    return total;  
};

export {
    sum,
    multiply
};