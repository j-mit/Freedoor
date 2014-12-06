/*

	Set all routes of the application

*/

var mainController = require('../../controllers/main')

;


module.exports = function(app, env) {
	
	//set all the routes for the application
	app.get('/', mainController.main);

	app.get('/*', mainController.stub);
}