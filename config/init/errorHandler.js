/*

	Store all the errors handled here
	Freedoor app

*/

module.exports = function(app, env) {
	//http status codes and errors
	var globalErrorHandler = {};

	//400 Bad request
	globalErrorHandler.code400 = {
		"status": "error",
		"errorCode": 400,
		"errorMessage": "Bad Request"
	}

	//404 Not found
	globalErrorHandler.code404 = {
		"status": "error",
		"errorCode": 404,
		"errorMessage": "Not Found"
	}

	//500 Internal server error
	globalErrorHandler.code500 = {
		"status": "error",
		"errorCode": 500,
		"errorMessage": "Internal Server Error"
	}

	//set the export to env
	env.globalErrorHandler = globalErrorHandler;

}
