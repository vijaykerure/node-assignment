'use strict';
import UserModel from '../user/user-model';

const signUp = async(req, res, next) => {
    let newUser = new UserModel(req.value.body);

    newUser = await newUser.save();
    if(!newUser){
        return next({status: 404});
    }
    return res.status(201).json({token: newUser, success: true});
}

const signIn = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user) {
            const error = new Error('An Error occurred');
            return next(error);
        }
        req.login(user, { session: false },
            async (error) => {
                if (error) {
                    return next(error);
                }
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'top_secret');
                return res.status(200).json({ token });
                //return res.formatter.ok({ token }, 'User loggedin successfully');
            }
        );
    } catch (error) {
        return error.message;//res.formatter.serverError(error.message);
    }
};

module.exports = { signIn, signUp };