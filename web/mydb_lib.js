"use strict"

var pg = require('pg');//nodemodule

function DB(database, port, host) {
  this.config = {
    database: database,
    port: port,
    host: host
  };
}

DB.prototype.connect = function(buzzer){ //Function that takes in anotehr function (POst Gress)
  pg.connect(this.config, function(err, client, done){//Database management
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      buzzer(client);//connect
      done();
  });
};

DB.prototype.query = function(statement, params, callback){
  this.connect(function(client){
    client.query(statement, params, callback);
  });
};

DB.prototype.end = function(){
 pg.end();
};

module.exports = DB;