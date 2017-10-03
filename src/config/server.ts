import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';

@injectable()
export class Server {

    private _server;
    private _logger;

    constructor(@inject(TYPES.ServerRestify) _server, @inject(TYPES.Log) _logger) {
        let port = process.env.PORT || 3000;
        port = (typeof port === 'string') ? parseInt(port, 10) : port;
        _server
            .setConfig((app) => {
                app.use(_logger);
            })
            .build()
            .listen(port, 'localhost', () => {
                console.log(`Listening on ${port}`);
            });
    }

}





