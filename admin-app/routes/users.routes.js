'use strict';

module.exports = function(app) {

	var controller = require('../controllers/users.controller');
	var accountCntrl = require('../controllers/account.controller');

	app.get('/admin/users',accountCntrl.authenticate,controller.index);
	app.get('/admin/users/create',accountCntrl.authenticate,controller.create);
	app.post('/admin/users/save',accountCntrl.authenticate,controller.save);
	
	app.get('/admin/users/edit/:userid',accountCntrl.authenticate,controller.edit);
	app.post('/admin/users/update',accountCntrl.authenticate,controller.update);

	app.get('/admin/api/users',controller.getUsers);
	app.post('/admin/api/users/actions',controller.updateUsers);
};
