var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;

function dbCreateOffer(offerObject, callback) {
	var offerId = {"offerId": env.uuid()};
	offerObject = _.extend(offerObject, offerId);
	// Create object instance for mongoose
	var dbOfferObject = new env.Offers(offerObject);

	// Because mongoose is an orm, we need to Fsave the object instance
	dbOfferObject.save(function(error, newOfferObject) {
		if(error) {
			logger.error('Error from database creating a offer.');
			return callback(error, null);
		}
		// Convert the mongoose doc to JSON object
		newOfferObject = newOfferObject.toObject();
		return callback(null, _.omit(newOfferObject, ['_id', '__v']));
	});
}

function dbGetOffer(offerid, callback) {
	env.Offers.findOne({ "offerId": offerid }, function(error, offerObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(offerObject)) {
			logger.debug('Null object received from database, offerId: ' + offerid);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		offerObject = offerObject.toObject();
		//Return the information from database
		return callback(null, _.omit(offerObject, ['_id', '__v']));
 	});
}

function dbGetOffers(callback) {
	
	env.Offers.find(function(error, offerObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(offerObject)) {
			logger.debug('Null object received from database');
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		var offerlist =_.toArray(offerObject);
				for (var i=0;i<offerlist.length;i++)
				{
					var aoffer = offerlist[i].toObject();
					offer = _.omit(aoffer, ['_id', '__v']);
					offerlist[i] = offer;
				}
			return callback(null, offerlist);
 	});
}


function dbUpdateOffer(offerid, offerup, callback) {
	env.Offers.update({ "offerId": offerid }, { $set : offerup }, function(error, offerObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		//offerObject = offerObject.toObject();
		//Return the information from database
		//return callback(null, _.omit(offerObject, ['_id', '__v']));
 	});
	
	var offerId = {"offerId": offerid};
	offerup = _.extend(offerup, offerId);
	// Create object instance for mongoose
	var dbOfferup = new env.History(offerup);

	// Because mongoose is an orm, we need to Fsave the object instance
	dbOfferup.save(function(error, newOfferObject) {
		if(error) {
			logger.error('Error from database creating a offer.');
			return callback(error, null);
		}
		// Convert the mongoose doc to JSON object
		newOfferObject = newOfferObject.toObject();
		return callback(null, _.omit(newOfferObject, ['_id', '__v']));
	});
}



function dbDeleteOffer(offerid, callback) {
	env.Offers.find({ "offerId": offerid }).remove(function(error, offerObject) {
		// log error from database, if so
		if(error) {                                                                                                                                                                                                                                                                                                                                                                
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(offerObject)) {
			logger.debug('Null object received from database, offerId: ' + offerid);
			return callback(null, null);
		}
		//Return the information from database
		return callback(null, true);
		});
	}


//Export all functions for this module
moduleExports = {}
moduleExports.dbGetOffer = dbGetOffer;
moduleExports.dbCreateOffer = dbCreateOffer;
moduleExports.dbGetOffers = dbGetOffers;
moduleExports.dbUpdateOffer = dbUpdateOffer;
moduleExports.dbDeleteOffer = dbDeleteOffer;

module.exports = moduleExports;