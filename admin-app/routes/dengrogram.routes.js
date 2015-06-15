'use strict';

module.exports = function(app) {

	var controller = require('../controllers/dendrogram.controller');
	
	app.get('/dendrogram',controller.index);
	app.get('/dendrogram/data',controller.get);
	app.post('/dendrogram/data',controller.post);
};
