/*

	Store all the errors handled here

*/

module.exports = function(app, env) {
	//http status codes and errors
	var globalErrorHandler = {};

	//400 Bad request
	globalErrorHandler.code400 = {
		error: {
			code: 400,
			message: "Bad request"
		}
	}

	//404 Not found
	globalErrorHandler.code404 = {
		error: {
			code: 404,
			message: "Not found"
		}
	}

	//500 Internal server error
	globalErrorHandler.code500 = {
		error: {
			code: 500,
			message: "Internal server error"
		}
	}

	//set the export to env
	env.globalErrorHandler = globalErrorHandler;

}
