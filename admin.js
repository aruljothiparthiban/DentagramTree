'use strict';

var http = require('http'),
	app = require('./admin-app/config/express')();

http.createServer(app).listen(app.get('port'), function(){
    console.log("Fotag admin is listening on port " + app.get('port'));
});