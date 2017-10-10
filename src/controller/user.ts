import * as restify from 'restify';
import { Controller as Router, Get, Post, Put, Delete, interfaces } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';
import { UserService } from '../service/user';
import { ValidationError } from 'class-validator';

@Router('/user')
@injectable()
export class UserController implements interfaces.Controller {

    @inject(TYPES.UserService) private userService: UserService;

    @Get('/')
    private getUsers(req: restify.Request): Promise<IUserModel[]> {
        // req.log.trace('caller is "TESTEEEEEE"');
        return this.userService.getUsers();
    }

    @Get('/:id')
    private getUser(req: restify.Request) {
        let user = this.userService.getUser(req.params.id);
        return user;
    }

    @Post('/')
    private newUser(req: restify.Request): Promise<IUserModel | ValidationError[]> {
        let user: IUser = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        return this.userService.newUser(user);
    }

    @Put('/:id')
    private updateUser(req: restify.Request): Promise<IUserModel | ValidationError[]> {

        let user: IUser = {
            email: req.body.email,
            firstName: req.body.firstName,
            id: req.params.id,
            lastName: req.body.lastName
        };
        return this.userService.updateUser(user);
    }

    @Delete('/:id')
    private deleteUser(req: restify.Request): Promise<IUserModel | ValidationError[]> {
        return this.userService.deleteUser(req.params.id);
    }

}
