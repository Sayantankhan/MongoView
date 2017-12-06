const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const expressValidator = require('express-validator');
const config = require('config');
const helmet = require('helmet');
const jade = require('jade');

// logger added
const logger = require('./config/loggerconfig');
var logobj = logger.getLogger('mongoview');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var route = require('./api/route/routes');
//==============================================================================

// helmet configure
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet({
  frameguard : false
}));

app.set('view engine', 'jade');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var rootdirectory = __dirname;

app.use(expressValidator());
route(app,rootdirectory,io);

//==============================================================================
logobj.trace('server running');
server.listen(config.port);
console.log(`Server running on ${config.port}`);
