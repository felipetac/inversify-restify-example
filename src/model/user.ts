import { Document, Schema, Model } from 'mongoose';
import { IUser } from '../interface/user';
import { mongoose } from '../config/database';

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export let UserSchema: Schema = new Schema({
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

export const User: Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);
