var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;

//set datamodels based on datastoreMode
var categoryModel = require("../models/categoryModel")

module.exports.postCategory = function(req, res) {
	if (_.isEmpty(req.body)) {
		logger.log("Empty request body received in POST category.");
		return res.send(400, env.errorMessages.code400);
	}
	userModel.dbCreateCategory(req.body, function(error, newUser) {
		if (error) {
			logger.error('Error from database in POST category. ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(newCategory)) {
			logger.debug('Null object received from database in POST category. ');
			return res.send(400, env.errorMessages.code400);
		}
		return res.send(200, newCategory);
	});
}

module.exports.getCategory = function(req, res) {
	var userId = req.params.user_id;
	userModel.dbGetCategory(userId, function(error, user) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(user)) {
			logger.debug('Null object received in get User controller, categoryId: ' + categoryId);
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, user);
	});
}