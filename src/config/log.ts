/*import * as morgan from 'morgan';
import fs = require('fs');
import path = require('path');
import rfs = require('rotating-file-stream');

let logDirectory = path.join(__dirname, 'log');

// Verifica se o diretório de log existe
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating write stream
let accessLogStream = rfs('access.log', {
    interval: '1d', // Estabelece logs diários d-1
    path: logDirectory
});

const logger = morgan('combined', {stream: accessLogStream});*/

import * as restify from 'restify';
import fs = require('fs');
import path = require('path');
import * as bunyan from 'bunyan';

const logDirectory = path.join(__dirname, '/../log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

console.log(logDirectory);

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




