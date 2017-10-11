import {
    registerDecorator, ValidationOptions, ValidatorConstraint,
    ValidatorConstraintInterface, ValidationArguments, Validator
} from 'class-validator';
import container from '../config/container';
import TYPES from '../constant/types';
import { Model } from 'mongoose';
import { IUserModel } from '../interface/user';

@ValidatorConstraint({name: 'isUserAlreadyExist', async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

    public validate(id: string, args: ValidationArguments) {
        const model: Model<IUserModel> = container.get(TYPES.UserModel);
        const validator: Validator = container.get(TYPES.Validator);
        if (validator.isMongoId(id)) {
            return model.findById(id).then(user => {
                if (user) {
                    return true;
                }
                return false;
            });
        }
        return false;
    }

    public defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return 'O Usuário Id:$value não foi encontrado';
    }

}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            constraints: [],
            name: 'IsUserAlreadyExist',
            options: validationOptions,
            propertyName: propertyName,
            target: object.constructor,
            validator: IsUserAlreadyExistConstraint
        });
   };
}
