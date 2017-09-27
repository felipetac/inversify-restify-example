import 'reflect-metadata';
import { interfaces, TYPE, Get } from 'inversify-restify-utils';
import { Container, decorate } from 'inversify';
import TYPES from '../constant/types';
import TAGS from '../constant/tags';
import { HomeController } from '../controller/home';
import { UserController } from '../controller/user';
import { UserService } from '../service/user';

// load everything needed to the Container
let container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);

export { container };
