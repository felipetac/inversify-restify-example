import { injectable, inject } from 'inversify';
import { Model } from 'mongoose';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';
import { UserForm } from '../form/user';
import { ValidationError } from 'class-validator';
import container from '../config/container';

@injectable()
export class UserService {

    @inject(TYPES.UserForm) private form;
    @inject(TYPES.UserModel) private model;

    public getUsers(): Promise<IUserModel[]> {
        return this.model.find().then(
            function(result) {
                return result;
            }
        );
    }

    public getUser(id: string): Promise<IUserModel | ValidationError[]> {
        return this.form.validId(id)
        .then(
            (errors) => {
                    if (errors.length > 0) {
                        return errors;
                    } else {
                        return this.model.findById(id).then(
                            function(res) {
                                if (!res) {
                                    return {success: 'false', msg: `Usuário com id:${id} não foi encontrado!`};
                                }
                                return res;
                            }
                        );
                    }
            }
        );
    }

    public newUser(user: IUser): Promise<IUserModel | ValidationError[]> {
        return this.form.polulate(user).validate('create').then((errors) => {
            if (errors.length > 0) {
                return errors;
            } else {
                return new this.model(user).save()
                .then(
                    function(result) {
                        return result;
                    }
                );
            }
        });
    }

    public updateUser(user: IUser): Promise<IUserModel | ValidationError[]> {
        return this.form.polulate(user).validate('update').then((errors) => {
            if (errors.length > 0) {
                return errors;
            } else {
                return this.model.findById(user.id)
                .then(
                    function(entity) {
                        if (!entity) {
                            return {success: 'false', msg: `Usuário com id:${user.id} não foi encontrado!`};
                        }
                        return entity.hydrate(user).save();
                    }
                )
                .then(
                    function(res) {
                        return res;
                    }
                );
            }
        });
    }

    public deleteUser(id: string): Promise<IUserModel | ValidationError[]> {
        return this.form.validId(id).then((errors) =>  {
                if (errors.length > 0) {
                    return errors;
                } else {
                    console.log('Entrei Model...');
                    return this.model.findByIdAndRemove(id).then(
                        function(res) {
                            if (!res) {
                                return {success: 'false', msg: `Usuário com id:${id} não foi encontrado!`};
                            }
                            return res;
                        }
                    );
                }
            }
        );
    }
}
