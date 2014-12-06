/*

	Main page for the webserver serving / call

*/

var env = require('../config/environment')
	, welcomeResponse = {
		welcomePage: "Welcome to the social network"
	}
;

module.exports = {
	//set module exports here, all the major website facades will be included in this module

	main: function(req, res) {
		res.send(200, welcomeResponse);
	},

	stub: function(req, res) {
		res.send(200, {stubbedPage: "This is a stubbed page for in progress work."});
	}
}
