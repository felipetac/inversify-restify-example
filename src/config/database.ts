import mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect((process.env.DSN || 'mongodb://127.0.0.1/typescript'), {
    useMongoClient: true,
});

export default mongoose;
