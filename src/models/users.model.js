import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minLength: 5,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    if (plainPassword === this.password) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const User = mongoose.model("User", userSchema);