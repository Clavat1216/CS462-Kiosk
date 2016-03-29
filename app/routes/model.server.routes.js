'use strict';

/**
 * Module dependencies.
 */

var users = require('../../app/controllers/users.server.controller'),
	model = require('../../app/controllers/model.server.controller');

module.exports = function(app) {
	//Model Routes
	app.route('/model')
		.get(model.getPlaces);
	app.route('/addPlace')
		.post(users.requiresLogin, model.addPlace);
	app.route('/removePlace')
		.post(users.requiresLogin, model.removePlace);
	app.route('/updatePlace')
		.post(users.requiresLogin, model.updatePlace);
};
