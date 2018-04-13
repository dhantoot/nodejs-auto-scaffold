// Dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mkdirp = require('mkdirp');
const http = require('http');
const passport = require('passport');
const port = process.env.DB_PORT || 3000;
const app = express();

global.rootdirectory = __dirname;

// apply middlewares for express
app.use(cors());
app.use(morgan('dev'));

// Cookies
app.use(cookieParser());

app.use("/public",express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(passport.initialize());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// load components
require('./app')(app);
require('./app/user')(app);
require('./app/login')(app);
//auto_add_routes_here_please_dont_delete

require('./utils')(app,port);


