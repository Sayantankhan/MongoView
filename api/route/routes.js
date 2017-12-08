'use strict';

// logger added
const logger = require('../../config/loggerconfig');
var logobj = logger.getLogger('mongoview');

const ymlconfig = require('../../config/ymlconfig');

module.exports = function(app,rootdirectory,io){
    var controller = require('../controller/connectcontroller');
    var users = [];
    var connections = [];
    logobj.trace('in routing stage');

    //  you are d oing an XMLHttpRequest to a different domain than your page is on.
    // So the browser is blocking it as it usually allows a request in the same origin for security reasons.
    // You need to do something different when you want to do a cross-domain request. (CORS - Cross-Origin XMLHttpRequest)
     // When you are using postman they are not restricted by this policy.

    // No 'Access-Control-Allow-Origin' header is present on the requested resource.
    // so Origin 'null' is therefore not allowed access by the browser
    // for that we have to set that header
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.route("/console")
       .get(controller.connectToDb);
       // .get(function(req,res){
       //    res.render('console', { url: ymlconfig.mongodb_url, port: ymlconfig.mongodb_port, database: ymlconfig.mongodb_database});
       //    return;
       // });

    app.route("/connect")
        .post(controller.connectToDb);

    app.route("/savechat")
        .get(function(req,res){
            console.log("form data");
        });

    app.use((req,res,next) => {
      const err = new Error('Not Found');
		  err.status = 404;
      logobj.error('404 error not found');
		  next(err);
    });

    io.on('connection', function(socket){
      console.log(socket.id);

      socket.on('setUsername', function(data) {
        console.log(data.toLowerCase());
        data = data.toLowerCase();
        if(users.indexOf(data) == -1) {
          //console.log();
           connections.push(socket);
           users.push(data);
           socket.emit('userSet', {username: data});
           io.emit('newUser',data+' has entered into chat');
        } else {
           socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
    });

      socket.on('chat message', function(msg){
        //console.log(msg);
        var msgbody = msg.split(':@:@:');
        var match = msgbody[0].toLowerCase().localeCompare('sayantan');
        if(match == 0)
        {
              msgbody[0] = msgbody[0] +'(DEV)';
        }
        else{
          msgbody[0] = msgbody[0] + '(MEMBER)';
        }
        msg = msgbody[0]+':@:@:'+msgbody[1];
        //console.log(msg);
        io.emit('chat message', msg);
      });

      socket.on('disconnect', function (data) {
        console.log(socket.id);
        var pos = connections.indexOf(socket);
        io.emit('chatend', users[pos] + ' left the chat');
        connections.splice(connections.indexOf(socket), 1);
        users.splice(pos, 1);

        console.log(socket+' disconnected');
        console.log(users);
        //controller.getDisconnect();
      });
    });



};
