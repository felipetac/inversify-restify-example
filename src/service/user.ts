import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';

@injectable()
export class UserService {

    @inject(TYPES.UserModel) private _model;

    private userStorage: IUser[] = [
        {
            email: 'felipe.cardoso@ipsum.com',
            firstName: 'Felipe',
            lastName: 'Cardoso'
        },
        {
            email: 'bruno.silva@ipsum.com',
            firstName: 'Bruno',
            lastName: 'Silva'
        }
    ];

    public getUsers(): IUser[] {
        return this.userStorage;
    }

    public getUser(id: string): IUser {
        let result: IUser;
        this.userStorage.map(user => {
            if (user.firstName === id) {
                result = user;
            }
        });

        return result;
    }

    public newUser(user: IUser): IUserModel {
        return this._model(user).save().then(function(result) {
            return result;
        });
    }

    public updateUser(id: string, user: IUser): IUser {
        this.userStorage.map((entry, index) => {
            if (entry.firstName === id) {
                this.userStorage[index] = user;
            }
        });

        return user;
    }

    public deleteUser(id: string): string {
        let updatedUser: IUser[] = [];
        this.userStorage.map(user => {
            if (user.firstName !== id) {
                updatedUser.push(user);
            }
        });

        this.userStorage = updatedUser;
        return id;
    }
}
