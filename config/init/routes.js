/*

	Set all routes of the freedoor application

*/

var userController = require('../../controllers/userController')
;

module.exports = function(app, env) {
	var baseurl = '/freedoor/v1';
	//set all the routes for freedoor application
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
}