'use strict';

/**
 * Module dependencies.
 */

var client = require('../config/cassandra')(),
	uuid = require('uuid');

/**
 * Action method for listing admin users
 *
 * @param req
 * @param res
 * @return users/index view
 */
exports.index = function(req, res) {
	res.render('users/index',{
		title:'Admin Users',
		user :req.user
	});
};

/**
 * Generates random string
 */
function generatePassword(){
	var length=16;
	var mask = '';
    mask += 'abcdefghijklmnopqrstuvwxyz';
    mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    mask += '0123456789';
    mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
};

/**
 * Action method for create user
 *
 * @param req
 * @param res
 * @return users/create view
 */
exports.create = function(req,res){
	var newUser ={};
	newUser.password = generatePassword();
	res.render('users/create',{
		title:'Create Admin User',
		model : newUser,
		user :req.user
	});
};

/**
 * Saves the new users
 *
 * @param req
 * @param res
 */
exports.save = function(req,res){
	var model = req.body;
	model.userid = uuid.v4();
	model.createdAt = model.updatedAt = new Date();
	model.isActive = true;
	
	client.execute("insert into adminusers (userid,firstname,lastname,email,password,isActive,createdAt,updatedAt) values (?,?,?,?,?,?,?,?)",
		[
			model.userid,
			model.firstname,
			model.lastname,
			model.email,
			model.password,
			model.isActive,
			model.createdAt,
			model.updatedAt
		], function (err, result){
		if (!err) {		
			res.redirect('/admin/users');
		}
		else{
			res.send(err);
		}
	});
};

/**
 * Action method for edit user
 *
 * @param req
 * @param res
 */
exports.edit = function(req,res){	
	var userid = req.params.userid;
	client.execute("SELECT * FROM adminusers where userid=?",[userid], function (err, result)
	{
		if(!err)
		{
			if (result.rows.length > 0) {
				var user = result.rows[0];				
			} else {
				res.send([]);
			}
			res.render('users/edit',{
				title:'Admin User('+userid+')',
				model: user,
				user :req.user
			});
		}
		else{
			res.send(err);
		}
	});
};


/**
 * Updates the user
 *
 * @param req
 * @param res
 */
exports.update = function(req,res){
	var model = req.body;
	model.updatedAt = new Date();

	client.execute("update adminusers set email=?,firstname=?,lastname=?,password=?,updatedAt=? where userid=?",
	[
		model.email,
		model.firstname,
		model.lastname,
		model.password,
		model.updatedAt,
		model.userid
	], function (err, result)
	{
		if (!err) {			
			res.redirect('/admin/users')
		}
		else{
			res.send(err);
		}
	});
};

/**
 * Returns the admin users json
 *
 * @param req
 * @param res
 * @return api
 */
exports.getUsers = function(req, res) {
	client.execute("SELECT * FROM adminusers",[], function (err, result)
	{
		if (!err) {			
			if (result.rows.length > 0) {
				var users = result.rows;				
				res.send(users);
			} else {
				res.send([]);
			}
		}
	});	
};

/**
 * Applying actions to admin users
 *
 * @param req
 * @param res
 * @return api
 */
exports.updateUsers = function(req,res){
	var model = req.body;
	var isActive = (model.action==='activate');
	client.execute("UPDATE adminusers set isactive=? where userid IN ?",
	[isActive,model.users],function(err,result){
		if (!err) {			
			res.send({success:true,message:'Record updated successfully!'})
		}
		else{
			res.send({success:false,message:err},500);
		}	
	});
};