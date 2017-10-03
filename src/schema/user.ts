import { Schema } from 'mongoose';

const UserSchema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
});

UserSchema.pre('save', function(next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
    });

UserSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + ' ' + this.lastName.trim());
};

export default UserSchema;




