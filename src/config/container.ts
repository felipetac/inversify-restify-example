import 'reflect-metadata';
import { interfaces, TYPE, InversifyRestifyServer } from 'inversify-restify-utils';
import { Container } from 'inversify';
import TYPES from '../constant/types';
import TAGS from '../constant/tags';
import { HomeController } from '../controller/home';
import { UserController } from '../controller/user';
import { UserService } from '../service/user';
import { Database } from '../config/database';
import { Server } from '../config/server';
import logger from '../config/log';

// load everything needed to the Container
const container = new Container();
container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<Database>(TYPES.Database).to(Database);
container.bind(TYPES.Log).toConstantValue(logger);
container.bind(TYPES.ServerRestify).toConstantValue(new InversifyRestifyServer(container));
container.bind<Server>(TYPES.Server).to(Server);
export default container;

