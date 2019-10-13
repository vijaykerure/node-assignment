'use strict';

import jwt from 'jsonwebtoken';

const signUp = async (request, response, next) => {
    return response.formatter.ok(request.user, successMessage(CREATED_USER_SUCCESS));
};


const signIn = async (request, response, next) => {
    const user = request.user;
    try {
        if (!user) {
            const error = new Error('An Error occurred');
            return next(error);
        }
        request.login(user, { session: false },
            async (error) => {
                if (error) {
                    return next(error);
                }
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'top_secret');
                return response.formatter.ok({ token }, successMessage(LOGGED_USER_SUCCESS));
            }
        );
    } catch (error) {
        return response.formatter.serverError(errorMessage(error.message));
    }
};

module.exports = { signIn, signUp };