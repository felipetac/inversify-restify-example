import mongoose = require('mongoose');
import { injectable } from 'inversify';
import q from 'q'; // using Q for the promise library in mongoose

@injectable()
export class Database {

    private _dsn: string;
    private _mongoose;

    constructor(dsn?: string) {
        this._dsn = process.env.DSN || 'mongodb://127.0.0.1/typescript';
        global.Promise = q.Promise;
        mongoose.Promise = global.Promise;
        mongoose.connect(this._dsn, {
            useMongoClient: true,
        });
        this._mongoose = mongoose;
    }

    public getModel(name, schema) {
        return this._mongoose.model(name, schema);
    }
}
