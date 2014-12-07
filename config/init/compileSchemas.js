/**
 * Validate schemas using z-schema
 */

var env = require("../../config/environment")
	, zSchema = require("z-schema")
	, objectSchemas = require("./objectSchemas")
	, moment = require('moment')
	, log = env.logger
	, validator = require("validator")
;

module.exports = function(app, env) {
	// Because other teams are using id as mysql autoincremented id, it can be a number
	// id type
	zSchema.registerFormat('freedoorId', function(str) {
		if ((typeof str == 'string') || (typeof str == 'number')) {
			return true;
		}
		return false;
	});

	//email type
	zSchema.registerFormat('email', function(str) {
		return validator.isEmail(str);
	});

	// validte timestamp because offer history depends on reverse chronology
	zSchema.registerFormat('unixTimestamp', function(num) {
		if (!moment(num).isValid()) return false;
		return true;
	});

	objectSchemaValidator = new zSchema({
		assumeAdditional: true,
		noEmptyArrays: true,
		noEmptyStrings: true
	});

	// post user schema
	success = objectSchemaValidator.validateSchema(objectSchemas.postUserSchema);
	if(!success) return log.error("Error from z-schma in compiling postUserSchema.");

	success = objectSchemaValidator.validateSchema(objectSchemas.postCategorySchema);
	if(!success) return log.error("Error from z-schma in compiling postCategorySchema.");

	success = objectSchemaValidator.validateSchema(objectSchemas.postProductSchema);
	if(!success) return log.error("Error from z-schma in compiling postProductSchema.");

	success = objectSchemaValidator.validateSchema(objectSchemas.putProductSchema);
	if(!success) return log.error("Error from z-schma in compiling putProductSchema.");

	success = objectSchemaValidator.validateSchema(objectSchemas.postOfferSchema);
	if(!success) return log.error("Error from z-schma in compiling postOfferSchema.");

	success = objectSchemaValidator.validateSchema(objectSchemas.putOfferSchema);
	if(!success) return log.error("Error from z-schma in compiling putOfferSchema.");

	success = objectSchemaValidator.validateSchema(objectSchemas.postCommentSchema);
	if(!success) return log.error("Error from z-schma in compiling postCommentSchema.");		

	log.log("Successfully loaded objectSchemas.");

	// populate env
	env.postUserSchema = objectSchemas.postUserSchema[0];
	env.postCategorySchema = objectSchemas.postCategorySchema[0];
	env.postProductSchema = objectSchemas.postProductSchema[0];
	env.putProductSchema = objectSchemas.putProductSchema[0];
	env.postOfferSchema = objectSchemas.postOfferSchema[0];
	env.putOfferSchema = objectSchemas.putOfferSchema[0];
	env.postCommentSchema = objectSchemas.postCommentSchema[0];
	env.objectSchemaValidator = objectSchemaValidator;
}