import * as restify from 'restify';
import { Controller as Router, Get, Post, Put, Delete, interfaces } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';
import { IUser, IUserModel } from '../interface/user';
import { UserService } from '../service/user';

@Router('/user')
@injectable()
export class UserController implements interfaces.Controller {

    @inject(TYPES.UserService) private userService: UserService;

    @Get('/')
    private getUsers(): Promise<IUserModel[]> {
        return this.userService.getUsers();
    }

    @Get('/:id')
    private getUser(req: restify.Request): Promise<IUserModel> {
        return this.userService.getUser(req.params.id);
    }

    @Post('/')
    private newUser(req: restify.Request): Promise<IUserModel> {
        let user: IUser = {
            email: req.params.email,
            firstName: req.params.firstName,
            lastName: req.params.lastName
        };
        return this.userService.newUser(user);
    }

    @Put('/:id')
    private updateUser(req: restify.Request): Promise<IUserModel> {
        return this.userService.updateUser(req.params.id, req.body);
    }

    @Delete('/:id')
    private deleteUser(req: restify.Request): Promise<IUserModel> {
        return this.userService.deleteUser(req.params.id);
    }
}
