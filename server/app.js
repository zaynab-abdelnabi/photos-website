require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/like');
const commentsRouter = require('./routes/comments');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);

app.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message });
});

app.use((err, req, res, next) => {
    if (err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError') {
        err.status = 422;
    }
    res.status(err.status || 500).json({ message: err.message || 'some error eccured.' });
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, err => {
    if (err) throw err;
    console.log('connected successfully');
});

module.exports = app;
