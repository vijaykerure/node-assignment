import { assert } from 'chai';
import { sum, multiply } from '../modules/calculator/calc-controller';

describe('Calc Controller Sum Method', () => {
    it('Sum if valid values passed', (done) => {
        const actual = sum(5, 6);
        assert.equal(actual, 11);
        done();
    });
});

describe('Calc Controller Multiply Method', () => {
    it('Multiply if valid values passed', (done) => {
        const actual = multiply(5, 6);
        assert.equal(actual, 30);
        done();
    });
});
