'use strict';
import express from 'express';
import { sum, multiply } from './calc-controller';

const calcRouter = express.Router();

calcRouter.get('/sum/:args', sum);

calcRouter.route('/multiply/:args')
    .get(multiply);

export default calcRouter;