import 'reflect-metadata';
import { interfaces, TYPE, InversifyRestifyServer } from 'inversify-restify-utils';
import { Container } from 'inversify';
import TYPES from '../constant/types';
import TAGS from '../constant/tags';
import { HomeController } from '../controller/home';
import { UserController } from '../controller/user';
import { UserService } from '../service/user';
import { Server } from '../config/server';
import mongoose from '../config/database';
import logger from '../config/log';
import { IUserModel } from '../interface/user';
import UserSchema from '../schema/user';
import { UserForm } from '../form/user';

// load everything needed to the Container
const container = new Container();
container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind(TYPES.Database).toConstantValue(mongoose);
container.bind(TYPES.Log).toConstantValue(logger);
container.bind(TYPES.ServerRestify).toConstantValue(new InversifyRestifyServer(container, {log: logger}));
container.bind<Server>(TYPES.Server).to(Server);
container.bind(TYPES.UserModel).toConstantValue(mongoose.model<IUserModel>('User', UserSchema));
container.bind<UserForm>(TYPES.UserForm).to(UserForm);

container.bind(TYPES.UserModelProvider).toProvider(() => {
    return container.get(TYPES.UserModel);
});

export default container;

