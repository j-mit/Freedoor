/*
 *
 * Database functionalities for category objects
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;

function dbCreatecategory(categoryObject, callback) {
	var categoryId = {"categoryId": env.uuid()};
	categoryObject = _.extend(categoryObject, categoryId);

	// Create object instance for mongoose
	var dbCategoryObject = new env.Category(categoryObject);

	// Because mongoose is an orm, we need to save the object instance
	dbCategoryObject.save(function(error, newCategoryObject) {
		if(error) {
			logger.error('Error from database creating a user.');
			return callback(error, null);
		}
		// Convert the mongoose doc to JSON object
		newCategoryObject = newCategoryObject.toObject();
		return callback(null, _.omit(newCategoryObject, ['_id', '__v']));
	});
}

function dbGetCategory(userId, callback) {
	env.Users.findOne({ "categoryId": categoryId }, function(error, userObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(categoryObject)) {
			logger.debug('Null object received from database, userId: ' + userId);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		categoryObject = categoryObject.toObject();
		//Return the information from database
		return callback(null, _.omit(categoryObject, ['_id', '__v']));
 	});
}

// Export all functions for this module
moduleExports = {}
moduleExports.dbGetCategory = dbGetCategory;
moduleExports.dbCreateCategory = dbCreateCategory;

module.exports = moduleExports;