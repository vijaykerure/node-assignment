'use strict';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import router from './router';
import { signUpStrategy, loginStrategy, verifyToken } from './modules/auth/auth-stratergy';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/assignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch( error => {
    console.log(error);
});


const app = express();

const port = 3000;


// Parse http application/json variables
//app.use(bodyParser.json());

// Parse http x-www-form-urlencoded variables
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());

passport.use('signup', signUpStrategy);

passport.use('signin', loginStrategy);

passport.use(verifyToken);

app.use('/api', router);

// app.use('/', (req, res) => {
//     res.status(200).json({message: 'hello' });
// });


app.listen(port, () => `Server running on port ${port}!`);


export default app;