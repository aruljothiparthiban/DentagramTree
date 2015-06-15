/**
 * Created by alexeypimenov on 03.06.15.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
    app.set('port', 3000);
    app.set('views', __dirname + '/app/server/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
//	app.use(express.favicon());
//	app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'super-duper-secret-secret' }));
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
    app.use(express.static(__dirname + '/app/public'));
    app.use('/',express.static(__dirname + '/'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

/*var config = require('./admin-app/config/config');
config.getGlobbedFiles('./admin-app/routes/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
});*/

require('./app/server/router')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
})