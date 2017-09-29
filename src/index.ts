import { InversifyRestifyServer } from 'inversify-restify-utils';
import { container } from './config/container';
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
        app.use(morgan('combined', {stream: accessLogStream}));
    })
    .build()
    .listen(port, 'localhost', () => {
        console.log(`Listening on ${port}`);
    });

