'use strict';

module.exports = function(app) {

	var controller = require('../controllers/home.controller');
	var accountCntrl = require('../controllers/account.controller');

	app.get('/',accountCntrl.authenticate,controller.index);
	app.get('/admin',accountCntrl.authenticate,controller.dashboard);
};
