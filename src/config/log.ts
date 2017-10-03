import * as morgan from 'morgan';
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

const logger = morgan('combined', {stream: accessLogStream});

export default logger;




