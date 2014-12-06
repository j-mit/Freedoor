/*
	Freedoor server file
*/

var app = require('express')()
	, http = require('http')
	, https = require('https')
	, sharedEnv = require('./config/environment')
	, fs = require('fs')
	, validator = require('validator')
	, logger = require('util')
;

// Set loggig to env
sharedEnv.logger = logger;

//Set init configuration
require('./config/init/config')(app, sharedEnv);
require('./config/init/errorHandler')(app, sharedEnv);
require('./config/init/mongodb')(app, sharedEnv);
require('./config/init/routes')(app, sharedEnv);

// logger has, logger.log, logger.debug, logger.error
// debug Level boolean from shareEnv.config.debug

//Create server based on config
if (sharedEnv.config.httpSecure) {
	var privateKey = fs.readFileSync('./config/key.pem');
	var certificate = fs.readFileSync('./config/cert.pem');
	var options = {
		key: privateKey,
		cert: certificate
	};
	server = https.createServer(options, app);
	console.log("Server running in secure mode");
} else {
	server = http.createServer(app);
}

app.listen(8000);
sharedEnv.logger.log("Freedoor Server listening on port 8000");
