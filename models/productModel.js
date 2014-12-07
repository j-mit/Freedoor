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

function dbCreateProduct(productObject, callback) {
	var productId = {"productId": env.uuid()};
	productObject = _.extend(productObject, productId);

	// Create object instance for mongoose
	var dbProductObject = new env.Products(productObject);

	// Because mongoose is an orm, we need to save the object instance
	dbProductObject.save(function(error, newProductObject) {
		if(error) {
			logger.error('Error from database creating a product.');
			return callback(error, null);
		}
		// Convert the mongoose doc to JSON object
		newProductObject = newProductObject.toObject();
		return callback(null, _.omit(newProductObject, ['_id', '__v']));
	});
}

function dbGetProduct(productId, callback) {
	env.Products.findOne({ "productId": productId }, function(error, productObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(productObject)) {
			logger.debug('Null object received from database, productId: ' + productId);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		productObject = productObject.toObject();
		//Return the information from database
		return callback(null, _.omit(productObject, ['_id', '__v']));
 	});
}

function dbGetProducts(categoryId, callback) {
	env.Products.find({ "categoryId": categoryId }, function(error, products) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(products)) {
			logger.debug('No products');
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		//Return the information from database
		var prodarray=_.toArray(products);
		for (var i=0;i<prodarray.length;i++)
		{
			var prod=prodarray[i].toObject();
			product = _.omit(prod, ['_id', '__v']);
			prodarray[i]=product;
		}
			
		return callback(null, prodarray);
 	});
}

function dbUpdateProduct(productId, productObject, callback) {
	
		dbDeleteProduct(productId, function(error, product) {
			if (error) 
			{
				logger.error('Error from database: ' + error);
				callback(error);
			}
		});
		dbCreateProduct(productObject, function(error, newProduct) {
			if (error) {
				logger.error('Error from database in POST product. ' + error);
				callback(error);
			}
			if (validator.isNull(newProduct)) {
				logger.debug('Null object received from database in POST product. ');
				callback(null, null);
			}
			return callback(null, newProduct);

		});
}

function dbDeleteProduct(productId, callback) {
	env.Products.find({ "productId": productId }).remove(function(error, productObject) {
		// log error from database, if so
		if(error) {                                                                                                                                                                                                                                                                                                                                                                
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(productObject)) {
			logger.debug('Null object received from database, productId: ' + productId);
			return callback(null, null);
		}
		//Return the information from database
		return callback(null, true);
 	});
}

// Export all functions for this module
moduleExports = {}
moduleExports.dbGetProducts=dbGetProducts;
moduleExports.dbGetProduct = dbGetProduct;
moduleExports.dbCreateProduct = dbCreateProduct;
moduleExports.dbUpdateProduct = dbUpdateProduct;
moduleExports.dbDeleteProduct = dbDeleteProduct;
module.exports = moduleExports;