'use strict';

module.exports = function(app) {

	var accountController = require('../controllers/account.controller');
	
	app.get('/admin/account/signin',accountController.signin);
	app.get('/admin/account/profile',accountController.authenticate,accountController.myProfile);
	app.post('/admin/account/profile',accountController.authenticate,accountController.updateMyProfile);
};
