/*

	Set all routes of the freedoor application

*/

var userController = require('../../controllers/userController')
	, categoryController = require('../../controllers/categoryController')
	, baseurl = '/freedoor/v1'
;

module.exports = function(app, env) {
	//set all the routes for freedoor application
	
	// User routes
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
	app.post(baseurl + '/category', categoryController.postCategory);
	app.get(baseurl + '/category/:category_id', categoryController.getCategory);

	// Category routes
	

}