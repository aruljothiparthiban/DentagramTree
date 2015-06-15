'use strict';

var http = require('http'),
	app = require('./dashboard/config/express')();

http.createServer(app).listen(app.get('port'), function(){
    console.log("Fotag dashboard is listening on port " + app.get('port'));
});