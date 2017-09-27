import { InversifyRestifyServer } from 'inversify-restify-utils';
import { container } from './config/container';
import * as morgan from 'morgan';

// start the server
let server = new InversifyRestifyServer(container);
server
    .setConfig((app) => {
        let logger = morgan('combined');
        app.use(logger);
    })
    .build()
    .listen(3001);
