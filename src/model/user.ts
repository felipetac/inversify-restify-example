import { Schema, Model } from 'mongoose';
import { IUserModel } from '../interface/user';
// import { Database } from '../config/database';
import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';

@injectable()
export class User {

    private _schema: Schema;
    private _entity: Model<IUserModel>;
    private _db;

    constructor(@inject(TYPES.Database) db) {
        this._db = db;
        this._schema = new Schema({
            createdAt: Date,
            email: String,
            firstName: String,
            lastName: String
        });

        this._schema.pre('save', function(next) {
            let now = new Date();
            if (!this.createdAt) {
              this.createdAt = now;
            }
            next();
          });

        this._schema.methods.fullName = function(): string {
            return (this.firstName.trim() + ' ' + this.lastName.trim());
        };

        this._entity = this._db.getModel('User', this._schema);
    }

    public getInstance(): Model<IUserModel> {
        return this._entity;
    }

}

