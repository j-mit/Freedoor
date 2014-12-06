/*
 *
 * Database functionalities for user objects
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, extend = require('extend')
	, async = require('async')
	, logger = env.logger
;

function dbGetUser(userId, callback) {
	env.Users.findOne({ "userId": userId }, function(error, userObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if null object received
		if(validator.isNull(userObject)) {
			logger.debug('Null object received from database, userId: ' + userId);
			return callback(null, null);
		}

		// Because mongo is an orm, it's doc needs to be converted to JS object
		userObj = userObj.toObject();

		//Return the information from database
		callback(null, _.omit(userObj, ['_id', '__v']));
		return;
 	});

}

// Export all functions for this module
moduleExports = {}
moduleExports.dbGetUser = dbGetUser;

module.exports = moduleExports;