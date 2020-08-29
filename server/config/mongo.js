const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

exports.connectMongo = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => console.log('Database Connected!!'))
        .catch((err) => {
            connectMongo();
            console.log(err);
        });
};

// module.exports = connectMongo();
