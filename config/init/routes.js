/*

	Set all routes of the freedoor application

*/

var userController = require('../../controllers/userController')
	, categoryController = require('../../controllers/categoryController')
	, commentController = require('../../controllers/commentController')
	, productController=require('../../controllers/productController')
	, offerController = require('../../controllers/offerController')
	, historyController = require('../../controllers/historyController')
	, baseurl = '/freedoor/v1'
;

module.exports = function(app, env) {
	//set all the routes for freedoor application
	app.get('/', function(req, res) {
		res.send(200, {
			"Welcome": "We are serving at baseurl: /freedoor/v1. Visit: http://192.168.4.250:8000/freedoor/v1",
			"Documentation": "http://nitsnwits.github.io/freedoor/freedoor-api.html"
		});
	});
	
	// User routes
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
	
	// Category routes
	app.post(baseurl + '/category', categoryController.postCategory);
	app.get(baseurl + '/category/:category_id', categoryController.getCategory);
	app.get(baseurl + '/category', categoryController.getCategories);
	
	
	//Products routes
	app.get(baseurl + '/category/:category_id/product', productController.getProducts);
	app.post(baseurl + '/category/:category_id/product', productController.postProduct);
	app.get(baseurl + '/category/:category_id/product/:product_id', productController.getProduct);
	app.put(baseurl + '/category/:category_id/product/:product_id', productController.putProduct);
	app.delete(baseurl + '/category/:category_id/product/:product_id', productController.deleteProduct);

	// Category routes

	//Comment routes
	app.post(baseurl + '/category/:category_id/product/:product_id/offer/:offer_id/comment', commentController.postComments);
	//app.get(baseurl + '/category/:category_id/product/:product_id/offer/:offer_id/comment/:comment_id', commentController.getComments);
	
	// Offer routes
	app.get(baseurl + '/category/:category_id/product/:product_id/offer', offerController.getOffer);
	app.post(baseurl + '/category/:category_id/product/:product_id/offer', offerController.postOffer);
	app.get(baseurl + '/category/:category_id/product/:product_id/offer/:offer_id', offerController.getOfferId);
	app.put(baseurl + '/category/:category_id/product/:product_id/offer/:offer_id', offerController.putOfferId);
	app.delete(baseurl + '/category/:category_id/product/:product_id/offer/:offer_id', offerController.deleteOfferId);
	
	//history routes
	app.get(baseurl + '/category/:category_id/product/:product_id/offer/:offer_id/history', historyController.getHistory);
	
}
