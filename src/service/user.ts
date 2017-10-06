import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';

@injectable()
export class UserService {

    @inject(TYPES.UserModel) private model: Model<IUserModel>;

    public getUsers(): Promise<IUserModel[]> {
        return this.model.find().then(
            function(result) {
                return result;
            },
            function(err) {
                return err;
            }
        );
    }

    public getUser(id: string): Promise<IUserModel> {
        return this.model.findById(id).then(
            function(result) {
                return result;
            },
            function(err) {
                return err;
            });
    }

    public newUser(user: IUser): Promise<IUserModel> {
        return new this.model(user).save().then(
            function(result) {
                return result;
            },
            function(err) {
                return err;
            }
        );
    }

    public updateUser(id: string, user: IUser): Promise<IUserModel> {
        return this.model.findById(id)
        .then(function(entity) {
            return entity.hydrate(user).save();
        })
        .then(
            function(result) {
                return result;
            },
            function(err) {
                return err;
            }
        );
    }

    public deleteUser(id: string): Promise<IUserModel> {
        return this.model.findByIdAndRemove(id).then(
            function(result) {
                return result;
            },
            function(err) {
                return err;
            }
        );
    }
}
