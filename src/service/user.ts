import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';

@injectable()
export class UserService {

    @inject(TYPES.UserModel) private _model: Model<IUserModel>;

    public getUsers(): Promise<IUserModel[]> {
        return this._model.find().then(function(result) {
            return result;
        });
    }

    public getUser(id: string): Promise<JSON | IUserModel> {
        return this._model.findById(id).then(
            function(result) {
                return result;
            },
            function(err) {
                return err;
            });
    }

    public newUser(user: IUser): Promise<IUserModel> {
        return new this._model(user).save().then(function(result) {
            return result;
        });
    }

    public updateUser(id: string, user: IUser): Promise<IUserModel> {
        return this._model.findById(id).then(function(entity) {
            entity.email = user.email || entity.email;
            entity.firstName = user.firstName || entity.firstName;
            entity.lastName = user.lastName || entity.lastName;
            return entity.save().then(function(result) {
                return result;
            });
        });
    }

    public deleteUser(id: string): Promise<boolean | IUserModel> {
        return this._model.findByIdAndRemove(id).then(function(result) {
            if (!result) {
                return false;
            }
            return result;
        }, function(err) {
            console.log(err);
        });
    }
}
