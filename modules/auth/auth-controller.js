'use strict';
//import { UserModel } from '../user/user-model';
import { signToken } from '../auth/auth-stratergy';

const signUp = async(req, res) => {
    return res.status(201).json({data: req.user, success: true});
};

const signIn = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user) {
            const error = new Error('An Error occurred');
            return next(error);
        }
        const token = signToken(user); 
        return res.status(200).json({ token });
    } catch (error) {
        return error.message;//res.formatter.serverError(error.message);
    }
};

module.exports = { signIn, signUp };