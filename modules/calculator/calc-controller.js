'use strict';

const sum = (req, res) => {
    const { x, y } = req.params;
    return res.status(200).json({ sum: x + y});
};

const multiply = (req, res) => {
    const { x, y } = req.params;
    return res.status(200).json({ multiplication: x * y });
};

export {
    sum,
    multiply
};