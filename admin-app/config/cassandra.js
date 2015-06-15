'use strict';

/**
 * Module dependencies.
 */

var cassandra = require('cassandra-driver'),
	async	= require('async'),
	environment = process.env.NODE_ENV || 'development',
	env = require('./env/'+environment);

var client = null;

module.exports = function(){
	if(!client){
		client = new cassandra.Client({ 
					contactPoints : env.db.cassandra.contactPoints ,
					keyspace: env.db.cassandra.keyspace
				});	
		client.connect(function(err, result) {
			if(!err){
				console.log('cassandra db is connected .');
				console.log('contact points',env.db.cassandra.contactPoints);
			}
			else{
				console.log(err);
			}
		});
	}	
	return client;	
};

	