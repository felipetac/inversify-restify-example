import * as restify from 'restify';
import fs = require('fs');
import path = require('path');
import * as bunyan from 'bunyan';

const logDirectory = path.join(__dirname, '/../log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logger = bunyan.createLogger({
    name: 'helloapi',
    serializers: {
        req: bunyan.stdSerializers.req,
        res: restify.bunyan.serializers.res,
    },
    streams: [
      {
        level: 'debug',
        stream: process.stdout
      },
      {
        level: 'trace',
        path: path.join(logDirectory, 'trace.log')
      }
    ]
});

export default logger;




