'use strict';
import express from 'express';
import { sum, multiply } from './calc-controller';

const calcRouter = express.Router();

calcRouter.get('/sum/:args',(req, res) => {
    const { args } = req.params;
    const total = sum(...args.split(','));
    return res.json({ sum: total });
});

calcRouter.get('/multiply/:args', (req, res) => {
    const { args } = req.params;
    const total = multiply(...args.split(','));
    return res.json({ multiplication: total });
});

export default calcRouter;