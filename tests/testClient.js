#!/usr/bin/env node
/**
 * Test all api's at once, configurable to hit remote servers
 */

var logger = require('util')
	, request = require('request')
	, async = require('async')
	, validator = require('validator')
	, _ = require('underscore')
;

function getRandomNumber(param) {
	if (param === "number") {
		return Math.random();
	} else if (param === "string") {
		return String(Math.random());
	}
	return Math.random();
}

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