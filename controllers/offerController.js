var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;

var offerModel = require("../models/offerModel")

module.exports.postOffer = function(req, res) {
	if (_.isEmpty(req.body)) {
		logger.log("Empty request body received in POST offer.");
		return res.send(400, env.errorMessages.code400);
	}
	if (env.config.server.validateSchemas && !env.objectSchemaValidator.validate(req.body, env.postOfferSchema)) {
		logger.log("Invalid post offer schema received. " + JSON.stringify(env.objectSchemaValidator.getLastErrors()));
		return res.send(400, _.extend(env.errorMessages.code400, env.objectSchemaValidator.getLastErrors()));
	}	
	offerModel.dbCreateOffer(req.body, function(error, newOffer) {
		if (error) {
			logger.error('Error from database in POST offer. ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(newOffer)) {
			logger.debug('Null object received from database in POST offer. ');
			return res.send(400, env.errorMessages.code400);
		}
		return res.send(200, newOffer);
	});
}

module.exports.getOffer = function(req, res) {
	offerModel.dbGetOffers(function(error, offer) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(offer)) {
			logger.debug('Null object received in get Offer controller');
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, offer);
	});
}


module.exports.getOfferId = function(req, res) {
	//console.log(req.params.offer_id);
	var offerId = req.params.offer_id;
	offerModel.dbGetOffer(offerId, function(error, offer) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(offer)) {
			logger.debug('Null object received in get Offer controller, offerId: ' + offerId);
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, offer);
	});
}

module.exports.putOfferId = function(req, res) {
	if (_.isEmpty(req.body)) {
		logger.log("Empty request body received in PUT offer.");
		return res.send(400, env.errorMessages.code400);
	}
	if (env.config.server.validateSchemas && !env.objectSchemaValidator.validate(req.body, env.putOfferSchema)) {
		logger.log("Invalid put offer schema received. " + JSON.stringify(env.objectSchemaValidator.getLastErrors()));
		return res.send(400, _.extend(env.errorMessages.code400, env.objectSchemaValidator.getLastErrors()));
	}	
	var offerid = req.params.offer_id;
	offerModel.dbUpdateOffer(offerid, req.body, function(error, upOffer) {
		if (error) {
			logger.error('Error from database in PUT offer. ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(upOffer)) {
			logger.debug('Null object received from database in PUT offer. ');
			return res.send(400, env.errorMessages.code400);
		}
		return res.send(200, upOffer);
	});
}

module.exports.deleteOfferId = function(req, res) {
	var offerid = req.params.offer_id;
	offerModel.dbDeleteOffer(offerid, function(error, delOffer) {
		if (error) {
			logger.error('Error from database in DELETE offer. ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(delOffer)) {
			logger.debug('Null object received from database in DELETE offer. ');
			return res.send(400, env.errorMessages.code400);
		}
		return res.send(200, delOffer);
	});
}

