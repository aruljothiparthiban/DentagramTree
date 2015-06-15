'use strict';

/**
 * Module dependencies.
 */

 var express = require('express'),
 	http = require('http'),
 	path = require('path'),
 	config = require('./config'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    func = require('./functions');


module.exports = function(){
	// initializing the express app
	var app = express();

	app.set('port', 3000);
    app.set('views', path.join(__dirname,'../views'));
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'super-duper-secret-secret' }));

    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(session({secret: 'fotag', saveUninitialized: true, resave: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    // Session-persisted message middleware
    app.use(function(req, res, next){
      var err = req.session.error,
          msg = req.session.notice,
          success = req.session.success;

      delete req.session.error;
      delete req.session.success;
      delete req.session.notice;

      if (err) res.locals.error = err;
      if (msg) res.locals.notice = msg;
      if (success) res.locals.success = success;
      next();
    });

    passport.use('local-signin', new LocalStrategy({passReqToCallback : true},
        function(req, username, password, done) {
            func.localAuth(username, password)
            .then(function (result) {
                if(result.user){
                  if(result.user.isactive){
                    req.session.success = 'You are successfully logged in ' + result.user.email + '!';
                    done(null, result.user);
                  }
                  else{
                    req.session.error = 'Your account is blocked.';
                    done(null, null);
                  }
                }
                else{
                    req.session.error = 'Username or Password incorrect !';
                    done(null,null);
                }
            })
            .fail(function (err){
                console.log(err.body);
            });
        }
    ));

    //sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
    app.post('/account/signin', passport.authenticate('local-signin', { 
      successRedirect: '/',
      failureRedirect: '/admin/account/signin'
      })
    );
    
    //logs user out of site, deleting them from the session, and returns to homepage
    app.get('/admin/account/signout', function(req, res){
        console.log(req.user);
        var name = req.user.email;
        req.logout();
        res.redirect('/admin/account/signin');
        req.session.notice = "You have successfully been logged out " + name + "!";
    });

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    app.use('/static',express.static(path.join(__dirname ,'../public')));

    app.configure('development', function(){
        app.use(express.errorHandler());
    });

     // registering routes
    config.getGlobbedFiles('./admin-app/routes/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

	return app;
};