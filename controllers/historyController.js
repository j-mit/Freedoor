/*
 *  http handlers for user objects
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;


//set datamodels based on datastoreMode
var historyModel = require("../models/historyModel")


module.exports.getHistory = function(req, res){
	var offerId = req.params.offer_id;
	historyModel.dbGetHistory(offerId, function(error, history) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(history)) {
			logger.debug('Null object received in get History controller, history: ' + history);
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, history);
	});
}
