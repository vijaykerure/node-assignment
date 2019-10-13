'use strict';
import express from 'express';
import { sum, multiply } from './calc-controller';

const calcRouter = express.Router();

calcRouter.get('/sum/:x/:y', sum);

calcRouter.route('/multiply/:x/:y')
    .get(multiply);

export default calcRouter;