import { Length, IsEmail, IsNotEmpty, validate as valid, ValidationError, IsMongoId} from 'class-validator';
import { IUser } from '../interface/user';

export class UserForm implements IUser {

    @IsMongoId({groups: ['update', 'id']})
    @IsNotEmpty({groups: ['update', 'id']})
    public id: string;

    @Length(3, 20, {groups: ['create', 'update']})
    @IsNotEmpty(({groups: ['create', 'update']}))
    public firstName: string;

    @Length(3, 20, {groups: ['create', 'update']})
    @IsNotEmpty({groups: ['create', 'update']})
    public lastName: string;

    @IsEmail({}, {groups: ['create', 'update']})
    @IsNotEmpty({groups: ['create', 'update']})
    public email: string;

    public polulate(body: IUser): UserForm {
        this.id = body.id || this.id;
        this.firstName = body.firstName || this.firstName;
        this.lastName = body.lastName || this.lastName;
        this.email = body.email || this.email;
        return this;
    }

    public validate(group): Promise<true | ValidationError[]> {
        return valid(this, {
            groups: [group]
        }).then(function(errors) {
            if (errors.length > 0) {
                return errors;
            } else {
                return true;
            }
        });
    }

}
