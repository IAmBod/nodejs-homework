const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const router = require('./routes/index');

const pageNotFoundHandler = require('./handler/pageNotFoundHandler');
const errorHandler = require('./handler/errorHandler');

const app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Assets
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

// Utilities
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
router(app);

// catch 404 and forward to error handler
app.use(pageNotFoundHandler);

// error handler
app.use(errorHandler);

module.exports = app;
