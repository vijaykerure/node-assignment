'use strict';

/**
 * Gives summation of n number of params
 * @param  {params} ...args
 * @returns {Number} total
 */
const sum = (...args) => {
    let total = 0;
    for (let arg of args) total += parseFloat(arg);
    return total;
};

/**
 * Gives multiplication of n number of params
 * @param  {params} ...args
 * @returns {Number} total
 */
const multiply = (...args) => {
    let total = 1;
    for (let arg of args) total *= parseFloat(arg);
    return total;  
};

export {
    sum,
    multiply
};