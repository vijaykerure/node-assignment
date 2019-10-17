'use strict';
import express from 'express';
import authRoute from './modules/auth/auth-route';
import calcRouter from './modules/calculator/calc-route';

import passport from 'passport';

const router = express.Router();

router.use('/', authRoute);

router.use('/', passport.authenticate('jwt',  { session: false }), calcRouter);

export default router;