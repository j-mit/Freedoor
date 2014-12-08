/*
 *
 * Database functionalities for comment objects
 *
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;


function dbCreateComment(commentObject, callback){
	var commentId = {"commentId": env.uuid()};
	commentObject = _.extend(commentObject, commentId) 
	
	//create object instance for mongoose
	var dbCommentObject = new env.Comments(commentObject);

	// Because mongoose is an orm, we need to save the object instance
	dbCommentObject.save(function(error, newCommentObject) {
		if(error) { 
			logger.error('Error from database creating a comment.');
			return callback(error, null);
		}
		// Convert the mongoose doc to JSON object
		newCommentObject = newCommentObject.toObject();
		return callback(null, _.omit(newCommentObject, ['_id', '__v']));
	});
}

function dbGetComment(commentId, callback){
	env.Comments.findOne({"commentId" : commentId},function(error, commentObject){
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(commentObject)) {
			logger.debug('Null object received from database, commentId: ' + commentId);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		commentObject = commentObject.toObject();
		//Return the information from database
		return callback(null, _.omit(commentObject, ['_id', '__v']));
 	});
}



moduleExports = {}
moduleExports.dbGetComment = dbGetComment;
moduleExports.dbCreateComment = dbCreateComment;
module.exports = moduleExports;
