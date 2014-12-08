/*
 *
 * Database functionalities for comment objects
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;


function dbGetHistory(offerId, callback){
	env.History.find({ "offerId": offerId },function(error, history){
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(history)) {
			logger.debug('Null object received from database, offerId: ' + offerId);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		//historyObject = historyObject.toObject();
		//Return the information from database
		return callback(null, _.omit(history, ['_id', '__v']));
 	});
}



moduleExports = {}
moduleExports.dbGetHistory = dbGetHistory;
module.exports = moduleExports;
