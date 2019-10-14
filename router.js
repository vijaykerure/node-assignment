'use strict';
import express from 'express';
import authRoute from './modules/auth/auth-route';
import calcRouter from './modules/calculator/calc-route';

const router = express.Router();

router.use('/', authRoute);

router.use('/', calcRouter);

export default router;