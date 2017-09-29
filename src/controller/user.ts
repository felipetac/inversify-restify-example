import * as restify from 'restify';
import { Controller as Router, Get, Post, Put, Delete, interfaces } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';
import { IUser } from '../interface/user';

@Router('/user')
@injectable()
export class UserController implements interfaces.Controller {

    @inject(TYPES.UserService) private userService;

    @Get('/')
    private getUsers(): IUser[] {
        return this.userService.getUsers();
    }

    @Get('/:id')
    private getUser(req: restify.Request): IUser {
        return this.userService.getUser(req.params.id);
    }

    @Post('/')
    private newUser(req: restify.Request): IUser {
        return this.userService.newUser(req.body);
    }

    @Put('/:id')
    private updateUser(req: restify.Request): IUser {
        return this.userService.updateUser(req.params.id, req.body);
    }

    @Delete('/:id')
    private deleteUser(req: restify.Request): string {
        return this.userService.deleteUser(req.params.id);
    }
}
