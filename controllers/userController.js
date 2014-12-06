/*
 * Users controller file
 */

/*
 *
 * Controller file for user object
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;

//set datamodels based on datastoreMode
var userModel = require("../models/userModel")

module.exports.postUser = function(req, res) {
	var stubbedUser = {
		'userId': '22f3bc90-7cf8-11e4-b4a9-0800200c9a66',
		'firstName': 'Test',
		'lastName': 'User',
		'emaiId': 'Test.User@test.com',
		'mobile': 4084084084
	}
	res.send(200, stubbedUser);
}

module.exports.getUser = function(req, res) {
	var stubbedUser = {
		'userId': '22f3bc90-7cf8-11e4-b4a9-0800200c9a66',
		'firstName': 'Test',
		'lastName': 'User',
		'emaiId': 'Test.User@test.com',
		'mobile': 4084084084
	}
	var userId = req.params.user_id;
	userModel.dbGetUser(userId, function(error, user) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.globalErrorHandler.code500);
		}
		if (validator.isNull(user)) {
			logger.debug('Null object received in get User controller, userId: ' + userId);
			return res.send(404, env.globalErrorHandler.code404);

		}
		// do other processing here, if needed
		return res.send(200, user);
	});
}

;