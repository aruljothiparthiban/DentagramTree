'use strict';

/**
 * Module dependencies.
 */

var client = require('../config/cassandra')();

/**
 * Action method for user singin
 *
 * @param req
 * @param res
 */
exports.signin = function(req, res) {	
	res.render('account/signin',{
		error:res.locals.error
	});
};

/**
 * Action method for logged in user profile
 *
 * @param req
 * @param res
 */
exports.myProfile = function(req, res) {
	res.render('account/myprofile',{
				title:'My Profile'
			});
};

/**
 * Update profile
 *
 * @param req
 * @param res
 */
exports.updateMyProfile = function(req, res) {	
	var model = req.body;
	model.updatedAt = new Date();
	var query ="update adminusers set email=?,firstname=?,lastname=?,password=?,";
		query +="facebookurl=?,twitterurl=?,googleplusurl=?,";
		query +="address_street=?,address_city=?,address_state=?,address_zip=?,";
		query +="about_me=?,profile_img=?,updatedAt=? where userid=?";

	client.execute(query,
	[
		model.email,
		model.firstname,
		model.lastname,
		model.password,
		model.facebookurl,
		model.twitterurl,
		model.googleplusurl,
		model.address_street,
		model.address_city,
		model.address_state,
		model.address_zip,
		model.about_me,
		model.profile_img,
		model.updatedAt,
		req.user.userid
	], function (err, result)
	{
		if (!err) {			
			res.redirect('/admin/account/profile');
		}
		else{
			res.send(err);
		}
	});
};


/**
 * Checks whether the user is authenticated or not
 * If not, redirects the user to signin page
 *
 * @param req
 * @param res
 */
exports.authenticate = function(req,res,next){
	return next();
	/*if(req.user){
		return next();
	}
	res.redirect('/admin/account/signin');*/
};