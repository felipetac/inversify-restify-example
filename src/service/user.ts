import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';
import { UserForm } from '../form/user';
import { ValidationError } from 'class-validator';

@injectable()
export class UserService {

    @inject(TYPES.UserModel) private model: Model<IUserModel>;
    @inject(TYPES.UserForm) private form: UserForm;

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

    public getUser(id: string): Promise<IUserModel | ValidationError[]> {
        let user: IUser = { id: id };
        return this.form.polulate(user).validate('id').then(function(result) {
            if (result === true) {
                return this.model.findById(id).then(
                    function(res) {
                        return res;
                    },
                    function(err) {
                        return err;
                    });
            } else {
                return result;
            }
        });
    }

    public newUser(user: IUser): Promise<IUserModel | ValidationError[]> {
        return this.form.polulate(user).validate('create').then(function(result) {
            if (result === true) {
                return new this.model(user).save().then(
                    function(res) {
                        return res;
                    },
                    function(err) {
                        return err;
                    }
                );
            } else {
                return result;
            }
        });
    }

    public updateUser(user: IUser): Promise<IUserModel | ValidationError[]> {
        return this.form.polulate(user).validate('update').then(function(result) {
            if (result === true) {
                return this.model.findById(user.id)
                .then(function(entity) {
                    return entity.hydrate(user).save();
                })
                .then(
                    function(res) {
                        return res;
                    },
                    function(err) {
                        return err;
                    }
                );
            } else {
                return result;
            }
        });
    }

    public deleteUser(id: string): Promise<IUserModel | ValidationError[]> {
        let user: IUser = { id: id };
        return this.form.polulate(user).validate('id').then(function(result) {
            if (result === true) {
                return this.model.findByIdAndRemove(id).then(
                    function(res) {
                        return res;
                    },
                    function(err) {
                        return err;
                    }
                );
            } else {
                return result;
            }
        });
    }
}
