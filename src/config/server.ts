import { InversifyRestifyServer } from 'inversify-restify-utils';
import container  from '../config/container';
import TYPES from '../constant/types';
import { injectable } from 'inversify';

@injectable()
export class Server {

    constructor() {
        let port = process.env.PORT || 3000;
        port = (typeof port === 'string') ? parseInt(port, 10) : port;
        container
            .get<InversifyRestifyServer>(TYPES.ServerRestify)
            .setConfig((app) => {
                app.use(container.get(TYPES.Log));
            })
            .build()
            .listen(port, 'localhost', () => {
                console.log(`Listening on ${port}`);
            });
    }

}





