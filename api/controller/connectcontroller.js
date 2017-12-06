const mongoose = require('mongoose');

// logger added
const logger = require('../../config/loggerconfig');
var logobj = logger.getLogger('mongoview');

const ymlconfig = require('../../config/ymlconfig');

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
var dbhost = ymlconfig.mongodb_url || null;
var port = ymlconfig.mongodb_port || null;
var db = ymlconfig.mongodb_database || null;
var user = ymlconfig.mongodb_user || null;
var password = ymlconfig.mongodb_password || null;
//mongodb://username:password@host:port/database
if((user == null) && (password == null)){
  mongoURL = `mongodb://${dbhost}/${db}`;
}
else{
  mongoURL = `mongodb://${user}:${password}@${dbhost}/${db}`;
}
console.log(mongoURL);
var connect = 0;

exports.connectToDb = function(req,res){
  // Create the database connection
  connect = connect+ 1;
  console.log(connect);
  console.log(mongoose.connection.readyState);
  if(mongoose.connection.readyState > 0){
    console.log('connected');
    res.render('console', { url: ymlconfig.mongodb_url, port: ymlconfig.mongodb_port, database: ymlconfig.mongodb_database, connected:'connected'});
  }
  else{
        mongoose.connect(mongoURL);
        // When successfully connected

        mongoose.connection.on('connected', function () {
          console.log('Mongoose default connection open to ' + mongoURL);
          res.render('console', { url: ymlconfig.mongodb_url, port: ymlconfig.mongodb_port, database: ymlconfig.mongodb_database, connected:'connected'});
          return;
        });

        // If the connection throws an error
        mongoose.connection.on('error',function (err) {
          console.log('Error in connection');
          logobj.error("error in connection || "+err);
          res.render('console', { url: ymlconfig.mongodb_url, port: ymlconfig.mongodb_port, database: ymlconfig.mongodb_database, connected:'disconnected'});
          return;
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
          console.log('Mongoose default connection disconnected');
          return;
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
          mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
          });
        });
      }


  // mongoose.connect(mongoURL,options,function(data){
  //   res.send('connected');})
  //   .catch(function(err){
  //     logobj.error("error in connection: "+err);
  //     res.send('not connected');
  // });

};

exports.getDisconnect = function(){
  console.log('mongo connection ended');
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}


exports.getDbInstance = mongoose;
