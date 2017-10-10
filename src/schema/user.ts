import { Schema } from 'mongoose';
import { IUser } from '../interface/user';

const UserSchema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
});

UserSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

UserSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + ' ' + this.lastName.trim());
};

UserSchema.methods.hydrate = function(user: IUser) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    return this;
};

export default UserSchema;




