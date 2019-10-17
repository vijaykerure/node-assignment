'use strict';

const LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

import JWT from 'jsonwebtoken';

import { UserModel } from '../user/user-model';

const signUpStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            let newUser = new UserModel({ email, password });
            const user = await newUser.save();
            user.password = undefined;
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
);

const loginStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const validate = await user.verifyPassword(password);
            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            done(error);
        }
    }
);

const verifyToken = new JWTstrategy({
    issuer: 'node-assignment',
    secretOrKey: 'secret_key',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    try {
        const user = await UserModel.findOne({ _id: payload.sub });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        done(error);
    }
});

const signToken = (user) => {
    return JWT.sign({
        iss: 'node-assignment',
        sub: user.id,
        iat: new Date().getTime(), // Current Time
        exp: new Date().setTime(new Date().getTime() + 1) // Current Time + 1 day ahead
    }, 'secret_key');
};

module.exports = { signUpStrategy, loginStrategy, verifyToken, signToken };