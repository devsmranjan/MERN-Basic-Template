const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const logger = require('morgan');
const cookieParser = require('cookie-parser');

const mongoConfig = require('./config/mongo');

app.use(logger('dev'));
app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
//to get json data
// support parsing of application/json type post data
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// data base
mongoConfig.connectMongo();

// /////////////////////////////////////////////
app.get('/', require('./routes/index'));

/////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    // index.html for all page routes
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../client', 'build', 'index.html')
        );
    });
    // Do not send stack trace of error message when in production
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        // res.send('Error occurred while handling the request.');
        res.json({
            success: false,
            data: {
                message: 'Error occurred while handling the request.',
                error: err,
            },
        });
    });
} else {
    // Log stack trace of error message while in development
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.log(err);
        res.json({
            success: false,
            data: {
                message: 'Error occurred while handling the request.',
                error: err,
            },
        });
    });
}

module.exports = app;
