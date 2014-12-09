var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;

function dbCreateOffer(offerObject, callback) {
	var offerId = {"offerId": env.uuid()};
	//console.log(offerObject.comments);
	//commentOb = _.pick(offerObject, 'comments');
	var comment = {"comments" : [offerObject.comments] };
	
	offerObject = _.omit(offerObject, 'comments');
	
	offerObject = _.extend(offerObject, offerId, comment);
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
	var offerObject1;
	env.Offers.findOne({ "offerId": offerid }, function(error, offerObject1) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(offerObject1)) {
			logger.debug('Null object received from database, offerId: ' + offerid);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		offerObject1 = offerObject1.toObject();
		
	if (offerup.buyingQty === offerObject1.buyingQty){
		offerObject1 = _.omit(offerObject1, 'buyingQty');}
	if (offerup.offeredDetails === offerObject1.offeredDetails){
		offerObject1 = _.omit(offerObject1, 'offeredDetails');}
	if (offerup.buyerStatus === offerObject1.buyerStatus){
		offerObject1 = _.omit(offerObject1, 'buyerStatus');}
	if (offerup.sellerStatus === offerObject1.sellerStatus){
		offerObject1 = _.omit(offerObject1, 'sellerStatus');}
	if (offerup.offerExpiry === offerObject1.offerExpiry){
		offerObject1 = _.omit(offerObject1, 'offerExpiry');}
	if (offerup.productId === offerObject1.productId){
		offerObject1 = _.omit(offerObject1, 'productId');}
	if (offerup.buyerId === offerObject1.buyerId){
		offerObject1 = _.omit(offerObject1, 'buyerId');}
							
	
	var last = {"lastModified": env.getUnixTimestamp()};
	var historyofferId = {"offerHistoryId": env.uuid()};
	offerObject1 = _.extend(offerObject1, last, historyofferId);
	offerObject1 = _.omit(offerObject1, ['_id', '__v', 'comments'])
	//console.log(offerObject1);
	//Add entry in History

	// Create object instance for mongoose
	var dbOfferup = new env.History(offerObject1);

	// Because mongoose is an orm, we need to Fsave the object instance
	dbOfferup.save(function(error, newOfferObject) {
		if(error) {
			logger.error('Error from database creating a history.');
			return callback(error, null);
		}
		
		
		
		// Convert the mongoose doc to JSON object
		newOfferObject = newOfferObject.toObject();
		callback(null, _.omit(newOfferObject, ['_id', '__v']));
		//Update Offer Table
		
		env.Offers.update({ "offerId": offerid }, { $set : offerup }, function(error, offerObject) {
			// log error from database, if so
			if(error) {
				logger.error('Error from database: ' + error);
				return callback(error);
			}
			return;
		
	 	});		
	});
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