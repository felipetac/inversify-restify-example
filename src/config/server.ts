import { injectable, inject } from 'inversify';
import TYPES from '../constant/types';
import * as restify from 'restify';

@injectable()
export class Server {

    constructor(@inject(TYPES.ServerRestify) server, @inject(TYPES.Log) logger) {
        let port = process.env.PORT || 3000;
        port = (typeof port === 'string') ? parseInt(port, 10) : port;
        server
            .setConfig((app) => {

                app.use(restify.plugins.acceptParser(app.acceptable));

                // to get query params in req.query
                // app.use(restify.plugins.queryParser());

                // to get passed json in req.body
                app.use(restify.plugins.bodyParser());

                // audit logger
                app.on('after', restify.plugins.auditLogger({
                    event: 'after',
                    log: logger
                }));

            })
            .build()
            .listen(port, 'localhost', () => {
                console.log(`Listening on ${port}`);
            });
    }

}





