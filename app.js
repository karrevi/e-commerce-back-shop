const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();


const express = require('express');
const path = require('path');

// Import Routes
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

// Use Routes
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;