/*
 *  http handlers for user objects
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;


//set datamodels based on datastoreMode
var commentModel = require("../models/commentModel")


module.exports.postComments = function(req,res){
	if (_.isEmpty(req.body)) {
		logger.log("Empty request body received in POST comment.");
		return res.send(400, env.errorMessages.code400);
	}
	if (env.config.server.validateSchemas && !env.objectSchemaValidator.validate(req.body, env.postCommentSchema)) {
		logger.log("Invalid post comment schema received. " + JSON.stringify(env.objectSchemaValidator.getLastErrors()));
		return res.send(400, _.extend(env.errorMessages.code400, env.objectSchemaValidator.getLastErrors()));
	}	
	commentModel.dbCreateComment(req.body, req.params.offer_id, function(error, offerObject){
		if(error){
			logger.error('Error from database in POST comment. ' + error);
			return res.send(500, env.errorMessages.code500);
		}

		if (validator.isNull(offerObject)) {
			logger.debug('Null object received from database in POST comment. ');
			return res.send(400, env.errorMessages.code400);
		}
		return res.send(200, offerObject);
	});	
}


module.exports.getComments = function(req, res){
	var commentId = req.params.comment_id;
	commentModel.dbGetComment(commentId, function(error, comment) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(comment)) {
			logger.debug('Null object received in get User controller, comment: ' + comment);
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, comment);
	});
}
