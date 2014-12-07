/*
 *	Mongo db set up file for freedoor
 *
 */

var mongoose = require('mongoose')
	, schema = require('mongoose').Schema
;

// blank schema to make req/res schema less
var userSchema = new schema({}, { strict: false });
var categorySchema = new schema({}, { strict: false });
var productSchema = new schema({}, { strict: false});
var offerSchema = new schema({}, { strict: false });
var historySchema = new schema({}, { strict: false });

module.exports = function(app, env) {
	// mongoose gives default pool of 100 connections
	var mongoUrl = env.config.mongo.url;
	env.db = mongoose.connect(mongoUrl);
	env.Users = mongoose.model('Users', userSchema);
	env.Category = mongoose.model('Category', categorySchema);
	env.Products = mongoose.model('Products', productSchema );
	env.Offers = mongoose.model('Offers', offerSchema);
	env.History = mongoose.model('History', historySchema);
}
