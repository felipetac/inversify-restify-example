import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';

@injectable()
export class Server {

    constructor(@inject(TYPES.ServerRestify) server, @inject(TYPES.Log) logger) {
        let port = process.env.PORT || 3000;
        port = (typeof port === 'string') ? parseInt(port, 10) : port;
        server
            .setConfig((app) => {
                app.use(logger);
            })
            .build()
            .listen(port, 'localhost', () => {
                console.log(`Listening on ${port}`);
            });
    }

}





