#!/usr/bin/env node
/**
 * Test all api's at once, configurable to hit remote servers
 */

var logger = require('util')
	, request = require('request')
	, async = require('async')
	, validator = require('validator')
	, _ = require('underscore')
	, moment = require('moment')
;

// Get random number for objects creation
function getRandomNumber(param) {
	if (param === "number") {
		return Math.random();
	} else if (param === "string") {
		return String(Math.random());
	}
	return Math.random();
}

// Get a new unix timestamp to update last modified
function getUnixTimestamp() {
	return Number(moment().format("X"));
}

// Post a new user
function postUser(baseurl, callback) {
	// test user
	var userObject = {
		'firstName': 'Test' + getRandomNumber("string"),
		'lastName': 'User' + getRandomNumber("string"),
		'emailId': 'Test.User' + getRandomNumber("string") + '@test.com',
		'mobile': getRandomNumber("number")
	}
	var url = baseurl + "/users";
	var options = {
		method: 'post',
		body: userObject,
		json: true,
		url: url
	}
	// callback would include error and response and body
	request(options, function(error, response, body) {
		if (error) {
			logger.log("Error received from postUser: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode);
		}
		return callback(null, body);
	});
}

// Get user based on user id
function getUser(baseurl, postUserBody, callback) {
	// callback would include error, response and body
	var userId = postUserBody.userId;
	var url = baseurl + "/users/" + userId;
	var options = {
		method: 'get',
		json: true,
		url: url
	}	
	request(options, function(error, response, body) {
		if(error) {
			logger.log("Error received from getUser: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(null, body);
		}
		return callback(null, body);
	});
}

// POST a category
function postCategory(baseurl, callback) {
	// callback would include error, body
	// test category
	var categoryObject = {
		'categoryName': 'TestCategory' + getRandomNumber("string")
	}
	var url = baseurl + "/category";
	var options = {
		method: 'post',
		body: categoryObject,
		json: true,
		url: url
	}
	// callback would include error and body
	request(options, function(error, response, body) {
		if (error) {
			logger.log("Error received from postCategory: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode);
		}
		return callback(null, body);
	});	
}

// Get a category
function getCategory(baseurl, postCategoryBody, callback) {
	// callback would include error, response and body
	var categoryId = postCategoryBody.categoryId;
	var url = baseurl + "/category/" + categoryId;
	var options = {
		method: 'get',
		json: true,
		url: url
	}	
	request(options, function(error, response, body) {
		if(error) {
			logger.log("Error received from getCategory: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(null, body);
		}
		return callback(null, body);
	});	
}

// get categories
function getCategories(baseurl, callback) {
	// callback would include error and body
	var url = baseurl + "/category"
	var options = {
		method: 'get',
		json: true,
		url: url
	}	
	request(options, function(error, response, body) {
		if(error) {
			logger.log("Error received from getCategories: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(null, body);
		}
		return callback(null, body);
	});		
}

// post a new product in a category
function postProduct(baseurl, waterfallJson, callback) {
	// callback would include error, body
	// post product
	var productObject = {
		'productName': 'NewProduct' + getRandomNumber("string"),
		'quantity': getRandomNumber(),
		'userId': waterfallJson.getUserBody.userId,
		'expectedOffer': 'This is a test of expectation.' + getRandomNumber("string"),
		'productDesc': 'Its a test prodcut ' + getRandomNumber("string"),
		'productExpiryDate': getUnixTimestamp(),
		'isValid': 1,
		'categoryId': waterfallJson.getCategoryBody.categoryId,
		'lastUpdated': getUnixTimestamp()
	}
	var url = baseurl + "/category/" + waterfallJson.getCategoryBody.categoryId + "/product";
	var options = {
		method: 'post',
		body: productObject,
		json: true,
		url: url
	}
	// callback would include error and body
	request(options, function(error, response, body) {
		if (error) {
			logger.log("Error received from postProduct: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode);
		}
		return callback(null, body);
	});		
}

// get a new product in a category
function getProduct(baseurl, waterfallJson, callback) {
	// callback would include error and body
	var url = baseurl + "/category/" + waterfallJson.getCategoryBody.categoryId + "/product/" + waterfallJson.postProductBody.productId;
	var options = {
		method: 'get',
		json: true,
		url: url
	}	
	request(options, function(error, response, body) {
		if(error) {
			logger.log("Error received from getProduct: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(null, body);
		}
		return callback(null, body);
	});		
}

// get a all products in a category
function getProducts(baseurl, waterfallJson, callback) {
	// callback would include error and body
	var url = baseurl + "/category/" + waterfallJson.getCategoryBody.categoryId + "/product";
	var options = {
		method: 'get',
		json: true,
		url: url
	}	
	request(options, function(error, response, body) {
		if(error) {
			logger.log("Error received from getProducts: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(null, body);
		}
		return callback(null, body);
	});		
}

// put product, change details of a product
function putProduct(baseurl, waterfallJson, callback) {
	// callback would include error, body
	// put product
	var productObject = waterfallJson.getProductBody;
	productObject.expectedOffer = "This is the changed offer." + getRandomNumber("string");
	var url = baseurl + "/category/" + waterfallJson.getCategoryBody.categoryId + "/product/" + waterfallJson.postProductBody.productId;
	var options = {
		method: 'put',
		body: productObject,
		json: true,
		url: url
	}
	// callback would include error and body
	request(options, function(error, response, body) {
		if (error) {
			logger.log("Error received from putProduct: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode);
		}
		return callback(null, body);
	});		
}

// post a new offer on a product
function postOffer(baseurl, waterfallJson, callback) {
	// callback would include error, body
	// post offer
	var offerObject = {
		'buyingQty': 2,
		'offeredDetails': 'This can be offered' + getRandomNumber("string"),
		'buyerStatus': 'Pending',
		'sellerStatus':  'Pending',
		'offerExpiry': getUnixTimestamp(),
		'productId': waterfallJson.getProductBody.productId,
		'buyerId': waterfallJson.getUserBody.userId,
		'lastModified': getUnixTimestamp()
	}
	var url = baseurl + "/category/" + waterfallJson.getCategoryBody.categoryId + "/product/" + waterfallJson.getProductBody.productId + "/offer";
	var options = {
		method: 'post',
		body: offerObject,
		json: true,
		url: url
	}
	// callback would include error and body
	request(options, function(error, response, body) {
		if (error) {
			logger.log("Error received from postOffer: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(response.statusCode);
		}
		return callback(null, body);
	});		
}

// get an offer by offer id
function getOffer(baseurl, waterfallJson, callback) {
	// callback would include error and body
	var url = baseurl + "/category/" + waterfallJson.getCategoryBody.categoryId + "/product/" + waterfallJson.getProductBody.productId + "/offer/" + waterfallJson.postOfferBody.offerId;
	var options = {
		method: 'get',
		json: true,
		url: url
	}	
	request(options, function(error, response, body) {
		if(error) {
			logger.log("Error received from getOffer: " + error);
			return callback(500);
		}
		if (response.statusCode !== 200) {
			return callback(null, body);
		}
		return callback(null, body);
	});		
}

// Display help || usage
function showUsage() {
	console.log("Usage: ./tests/testClient hostname port baseurl all|user|category|product|offer");
	return;
}

function main(args) {
	// Setup test env
	baseurl = "http://" + args[2] + ":" + args[3] + args[4];
	logger.log("Running all tests on server: " + baseurl);

	waterfallJson = {};
	waterfallJson.baseurl = baseurl;
	// Run all steps in sequence here, getting id's from previous steps
	async.waterfall([
	// Test 1: Post user
	function(cb) {
		postUser(baseurl, function(error, body) {
			if (error) {
				logger.log("Test 1: Post User: Failed. Error code: " + error)
				return cb(error);
			}
			if (_.isEmpty(body) || !body.userId) {
				logger.log("Test 1: Post User: Failed. Empty Body or no user Id received.");
				return cb(500);
			}
			waterfallJson.postUserBody = body;
			logger.log("Test 1: Post user: \t\t\tOK")
			cb(null, waterfallJson);
		});
	},

	//Test 2: Get user
	function(waterfallJson, cb) {
		getUser(baseurl, waterfallJson.postUserBody, function(error, body) {
			if (error) {
				logger.log("Test 2: Get User: Failed. Error code: " + error)
				return cb(error);
			}
			if (_.isEmpty(body) || !body.userId) {
				logger.log("Test 2: Get User: Failed. Empty Body or no user Id received.");
				return cb(500);
			}			
			waterfallJson.getUserBody = body;
			logger.log("Test 2: Get user: \t\t\tOK");
			cb(null, waterfallJson);
		});
	},

	//Test 3: Post category
	function(waterfallJson, cb) {
		postCategory(baseurl, function(error, body) {
			if (error) {
				logger.log("Test 3: Post Category: Failed. Error code: " + error);
				return cb(error);
			}
			if (_.isEmpty(body) || !body.categoryId) {
				logger.log("Test 3: Post Category: Failed. Empty Body or no category Id received.");
				return cb(500);
			}			
			waterfallJson.postCategoryBody = body;
			logger.log("Test 3: Post Category: \t\tOK");
			cb(null, waterfallJson);			
		});
	},

	//Test 4: Get category
	function(waterfallJson, cb) {
		getCategory(baseurl, waterfallJson.postCategoryBody, function(error, body) {
			if (error) {
				logger.log("Test 4: Get Category: Failed. Error code: " + error)
				return cb(error);
			}
			if (_.isEmpty(body) || !body.categoryId) {
				logger.log("Test 4: Get Category: Failed. Empty Body or no categoryId received.");
				return cb(500);
			}			
			waterfallJson.getCategoryBody = body;
			logger.log("Test 4: Get category: \t\t\tOK");
			cb(null, waterfallJson);
		});
	},

	//Test 5: Get categories
	function(waterfallJson, cb) {
		getCategories(baseurl, function(error, body) {
			if (error) {
				logger.log("Test 5: Get Categories: Failed. Error code: " + error)
				return cb(error);
			}
			if (_.isEmpty(body) || !body[0].categoryId) {
				logger.log("Test 5: Get Categories: Failed. Empty Body or no categoryId received.");
				return cb(500);
			}			
			//waterfallJson.getCategoriesBody = body;
			logger.log("Test 5: Get categories: \t\tOK");
			cb(null, waterfallJson);
		});
	},

	//Test 6: Post product
	function(waterfallJson, cb) {
		postProduct(baseurl, waterfallJson, function(error, body) {
			if (error) {
				logger.log("Test 6: Post Product: Failed. Error code: " + error);
				return cb(error);
			}
			if (_.isEmpty(body) || !body.productId) {
				logger.log("Test 6: Post Product: Failed. Empty Body or no product Id received.");
				return cb(500);
			}			
			waterfallJson.postProductBody = body;
			logger.log("Test 6: Post Product: \t\t\tOK");
			cb(null, waterfallJson);			
		});
	},

	//Test 7: Get product
	function(waterfallJson, cb) {
		getProduct(baseurl, waterfallJson, function(error, body) {
			if (error) {
				logger.log("Test 7: Get Product: Failed. Error code: " + error)
				return cb(error);
			}
			if (_.isEmpty(body) || !body.productId) {
				logger.log("Test 7: Get Product: Failed. Empty Body or no productId received.");
				return cb(500);
			}			
			waterfallJson.getProductBody = body;
			logger.log("Test 7: Get product: \t\t\tOK");
			cb(null, waterfallJson);
		});
	},

	//Test 8: Get products
	function(waterfallJson, cb) {
		getProducts(baseurl, waterfallJson, function(error, body) {
			if (error) {
				logger.log("Test 8: Get Products: Failed. Error code: " + error)
				return cb(error);
			}
			if (_.isEmpty(body) || !body[0].productId) {
				logger.log("Test 8: Get Products: Failed. Empty Body or no productId received.");
				return cb(500);
			}			
			//waterfallJson.getProductsBody = body;
			logger.log("Test 8: Get products: \t\t\tOK");
			cb(null, waterfallJson);
		});
	},

	//Test 9: Put product
	function(waterfallJson, cb) {
		putProduct(baseurl, waterfallJson, function(error, body) {
			if (error) {
				logger.log("Test 9: Put Product: Failed. Error code: " + error);
				return cb(error);
			}
			if (_.isEmpty(body) || !body.productId) {
				logger.log("Test 9: Put Product: Failed. Empty Body or no product Id received.");
				return cb(500);
			}			
			//waterfallJson.putProductBody = body;
			logger.log("Test 9: Put Product: \t\t\tOK");
			cb(null, waterfallJson);			
		});
	},

	//Test 10: Post Offer
	function(waterfallJson, cb) {
		postOffer(baseurl, waterfallJson, function(error, body) {
			if (error) {
				logger.log("Test 10: Post Offer: Failed. Error code: " + error);
				return cb(error);
			}
			if (_.isEmpty(body) || !body.offerId) {
				logger.log("Test 10: Post Offer: Failed. Empty Body or no offer Id received.");
				return cb(500);
			}			
			waterfallJson.postOfferBody = body;
			logger.log("Test 10: Post Offer: \t\t\tOK");
			cb(null, waterfallJson);			
		});
	},

	//Test 11: Get Offer
	function(waterfallJson, cb) {
		getOffer(baseurl, waterfallJson, function(error, body) {
			if (error) {
				logger.log("Test 11: Get Offer: Failed. Error code: " + error);
				return cb(error);
			}
			if (_.isEmpty(body) || !body.offerId) {
				logger.log("Test 11: Get Offer: Failed. Empty Body or no offer Id received.");
				return cb(500);
			}			
			waterfallJson.getOfferBody = body;
			logger.log("Test 11: Get Offer: \t\t\tOK");
			cb(null, waterfallJson);			
		});
	}

	],
	function(error, waterfallJson) {
		if (error) {
			logger.error("Error received in one of the request. Quitting client.");
			return;
		}
		//console.log(waterfallJson);
	}); // finish waterfall

}

// Run main or show usage
if (process.argv.length == 6) {
	main(process.argv);
} else {
	showUsage();
}