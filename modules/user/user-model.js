'use strict';
import bcrypt from 'bcryptjs';
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
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Verify password hash
UserSchema.methods.verifyPassword = async function(newPassword) {
    try {
        let result = await bcrypt.compare(newPassword, this.password);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = { UserModel };