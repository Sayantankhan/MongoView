# MongoView

===================================================RUNNING MONGO AS A SERVICE=====================================================================
REGISTER MONGO AS A SERVICE....(use administator mode only)
>mongod --directoryperdb --dbpath "path to mongo dump" --logpath "logfile for mongo log" --logappend --rest --install

extra flags: --port 27017,--bindIp <ip>, --journal(for journaling) etc..

Uses a separate directory to store data for each database. 
The directories are under the --dbpath directory, and each subdirectory name corresponds to the database name.


By default, MongoDB will move any existing log file rather than overwrite it. To instead append to the log file, set the --logappend option.
so logappend is used to append with previous logfile.else previous data will be removed 

--rest used for rest calling purpose
RESTHeart Java REST API server for MongoDB, built on top of Undertow non-blocking HTTP server. License: GNU AFFERO GENERAL PUBLIC LICENSE Version 3.Java REST API server for MongoDB, built on top of Undertow non-blocking HTTP server. 
License: GNU AFFERO GENERAL PUBLIC LICENSE Version 3.

--install is used to bind mongo as a service which will run in background


TO RUN THE SERVICE
>net start MongoDB

FOR RUNNING MONGO SHELL
>mongo
or
>mongo --port 27017 -u "superAdmin" -p "admin123"(for userName and Password)

STOP THE SERVICE
net stop <Service-Name>  //here Service-Name = MongoDB

DELETE A SERVICE
sc.exe delete <Service-Name>  //here Service-Name = MongoDB
		
=====================================================RUNNING MONGO FROM A CONFIG FILE=====================================================

OR CREATE A /etc/mongod.conf FILE
storage:
    dbPath: "/data/db"
systemLog:
    path: "/var/log/mongodb/mongod.log"
    logAppend: true
processManagement:
    pidfilepath=/var/run/mongodb/mongod.pid
    fork: true
net:
    bindIp: 127.0.0.1
    port: 27018
sharding:
   clusterRole: shardsvr
replication:
   oplogSizeMB: 1024
security:
 authorization: enabled
 
RUN mongod SERVER
>mongod --config /etc/mongod.conf   

FOR RUNNING MONGO SHELL
>mongo

or
>mongo --port 27017 -u "superAdmin" -p "admin123"(for userName and Password)
 
=======================================================RUNNING A MONGO INSTANCE==========================================================

RUN MONGO WITHOUT REGISTERING AS A SERVICE (NORMAL CMD)
>mongod --dbpath "path to mongo dump" --logpath "logfile for mongo log" --logappend --rest

FOR RUNNING MONGO SHELL
>mongo

or
>mongo --port 27017 -u "superAdmin" -p "admin123"(for userName and Password)