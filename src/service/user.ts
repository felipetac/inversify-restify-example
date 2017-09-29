import { injectable } from 'inversify';
import { IUser } from '../interface/user';

@injectable()
export class UserService {

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

    public newUser(user: IUser): IUser {
        this.userStorage.push(user);
        return user;
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
