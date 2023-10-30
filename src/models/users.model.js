import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    kakaoId: {
        type: String,
        unique: true,
        sparse: true,
    },
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.pre("save", function(next) {
    let user = this;
    if (!user.isModified("password")) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next();

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

export const User = mongoose.model("User", userSchema);