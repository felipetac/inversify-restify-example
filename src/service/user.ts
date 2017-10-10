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
        const m = this.model;
        return this.form.validId(id)
        .then(
            function(errors: any) {
                if (errors.length > 0) {
                    return errors;
                } else {
                    return m.findById(id).then(
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
        const m = this.model;
        return this.form.polulate(user).validate('create').then(function(errors) {
            if (errors.length > 0) {
                return errors;
            } else {
                return new m(user).save()
                .then(
                    function(result) {
                        return result;
                    }
                );
            }
        });
    }

    public updateUser(user: IUser): Promise<IUserModel | ValidationError[]> {
        const m = this.model;
        return this.form.polulate(user).validate('update').then(function(errors) {
            if (errors.length > 0) {
                return errors;
            } else {
                return m.findById(user.id)
                .then(
                    function(entity) {
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
        const m = this.model;
        return this.form.validId(id).then(
            function(errors) {
                if (errors.length > 0) {
                    return errors;
                } else {
                    console.log('Entrei Model...');
                    return m.findByIdAndRemove(id).then(
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
