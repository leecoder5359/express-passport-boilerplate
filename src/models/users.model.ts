import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    googleId: string;

    comparePassword(plainPassword: string): boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
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

userSchema.methods.comparePassword = function(plainPassword: string): boolean {
    return plainPassword === this.password;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
