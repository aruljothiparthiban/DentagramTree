'use strict';

/**
 * Module dependencies.
 */
var bcrypt = require('bcryptjs'),
    Q = require('q'),
    client = require('./cassandra')();

exports.localAuth = function (email, password) {
  var deferred = Q.defer();
  client.execute("SELECT * FROM adminusers where email=?",[email], function (err, result)
	{
		if(!err)
		{
      console.log(result);
			var user = result.rows[0];
      // && user.password === password
      if(user){
        deferred.resolve({
          user:user,
          isactive : user.isactive
        });
      }
      else{
        deferred.resolve(false);
      }
		}
		else{
			deferred.resolve(false);
		}		
	});
	return deferred.promise;  
};