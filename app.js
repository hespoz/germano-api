var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import passport from './config/passport'

import auth from './routes/auth';
import user from './routes/user';
import bucket from './routes/bucket';
import dictionary from './routes/dictionary';
import comment from './routes/comment';

var app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/bucket', bucket(app, passport));
app.use('/api/v1/dictionary', dictionary(app, passport));
app.use('/api/v1/comment', comment(app, passport));

module.exports = app;
