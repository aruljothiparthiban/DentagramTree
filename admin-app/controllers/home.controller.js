'use strict';

/**
 * Module dependencies.
 */

var client = require('../config/cassandra')();

/**
 * Action method for home page
 *
 * @param req
 * @param res
 */
exports.index = function(req, res) {
	res.redirect('/admin');
};

/**
 * Action method to handle dashboard page
 *
 * @param req
 * @param res
 */
exports.dashboard = function(req, res) {
	res.render('home/dashboard',{
		title:'Dashboard',
		user :req.user
	});
};