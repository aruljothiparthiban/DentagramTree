'use strict';

/**
 * Module dependencies.
 */

 var express = require('express'),
 	http = require('http'),
 	path = require('path'),
 	config = require('./config');

var json = {
    name: "Home",
    type: "page",
    children: [
    {
        name: "Landscapes",
        type: "page",
        children: [
        {
            name: "Africa",
            children: [
            {
                name: "Item1",
                type:"content",
                imageUrl:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR8LRL8jx73N5ft9nzZVDttb5jX6PeTFeKd6zK-5GSDd1iRcn6l"
            }, 
            {
                name: "Item2",
                type:"content",
                imageUrl:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSY8nNb4pul-75tR8RIWMdevrQ0sL9iE2MaKWgMkrrG1UihxNM6QA"
            }]
        },
        {
            name: "America",
            children: [
            {
                name: "Item1",
                type:"content",
                imageUrl:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR8LRL8jx73N5ft9nzZVDttb5jX6PeTFeKd6zK-5GSDd1iRcn6l"
            },
            {
                name: "Item2",
                type:"content",
                imageUrl:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSY8nNb4pul-75tR8RIWMdevrQ0sL9iE2MaKWgMkrrG1UihxNM6QA"
            }]
        }]
    }]
};

  var app = null;

module.exports = function(){
	// initializing the express app
	 if(app === null)
   {
     app = express();

      app.set('jsonData',json);
  	 app.set('port', 3000);
      app.set('views', path.join(__dirname,'../views'));
      app.set('view engine', 'jade');
      app.locals.pretty = true;
      app.use(express.bodyParser());
      app.use(express.cookieParser());

      app.use('/static',express.static(path.join(__dirname ,'../public')));

      app.configure('development', function(){
          app.use(express.errorHandler());
      });

       // registering routes
      config.getGlobbedFiles('./admin-app/routes/*.js').forEach(function(routePath) {
          require(path.resolve(routePath))(app);
      });
  }
	return app;
};