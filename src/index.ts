import { InversifyRestifyServer } from 'inversify-restify-utils';
import { container } from './config/container';
import * as morgan from 'morgan';

const port = normalizePort(process.env.PORT || 3000);
let server = new InversifyRestifyServer(container);

function normalizePort(val: number|string): number|string|boolean {
    let p: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(p)) {
        return val;
    } else if (p >= 0) {
        return p;
    } else {
        return false;
    }
}

server
    .setConfig((app) => {
        let logger = morgan('combined');
        app.use(logger);
    })
    .build()
    .listen(port);

console.log(`Listening on ${port}`);
