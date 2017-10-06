import { Document } from 'mongoose';

export interface IUser {
    email?: string;
    firstName?: string;
    lastName?: string;
}

export interface IUserModel extends IUser, Document {
    fullName(): string;
    hydrate(user: IUser);
}
