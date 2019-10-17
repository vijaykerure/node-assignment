'use strict';
import { genSalt, hash, compare } from 'bcryptjs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({    
    active: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profile: {
        fullName: {
            type: String,
        },
        phone: {
            type: String,
        },
        city: {
            type: String,
        },
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


// Hook - calls before save into collection
UserSchema.pre('save', async function(next){
    try {
        let salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Verify password hash
UserSchema.methods.verifyPassword = async function(newPassword) {
    return await compare(newPassword, this.password);
};

const UserModel = mongoose.model('user', UserSchema);

export { UserModel };