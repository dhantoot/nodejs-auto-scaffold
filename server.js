// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const port = process.env.SERVER_PORT || 3000;
const app = express();

global.rootdirectory = __dirname;
global.api_url = '/api/1.0';

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

// initiate auto-scaffolding feature and start listening to server
require('./app')(app,port);


