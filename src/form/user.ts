import { Length, IsEmail, IsNotEmpty, validate as valid, ValidationError, IsMongoId} from 'class-validator';
import { IUser } from '../interface/user';
import { injectable } from 'inversify';

@injectable()
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

    public setId(id: string): UserForm {
        this.id = id;
        return this;
    }

    public validate(group): Promise<ValidationError[]> {
        return valid(this, {
            groups: [group],
            skipMissingProperties: true, // skip validation of the properties that does not exist in the validating object
            validationError: { target: false } // useful when you send errors back over http
        });
    }

    public validId(id): Promise<ValidationError[]> {
        return this.setId(id).validate('id');
    }

}
