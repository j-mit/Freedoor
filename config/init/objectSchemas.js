/**
 * Defines the schemas that are accepted according to the API's
 * Visit: nitsnwits.github.io/freedoor/freedoor-api.html for documentation
 */

var moduleExports = {};

// POST /user object request body schema
moduleExports.postUserSchema = [
	{
		id: "userObject",
		type: "object",
		properties: {
			firstName: { type: "string"},
			lastName: { type: "string"},
			emailId: { type: "string", format: "email" },
			mobile: { type: "number", minLength: 3, maxLength: 36 }
		},
		required: ["emailId"]
	}
]

// POST category object request body schema
moduleExports.postCategorySchema = [
	{
		id: "categoryObject",
		type: "object",
		properties: {
			categoryName: { type: "string" }
		},
		required: ["categoryName"]
	}
]

// POST product obejct request body schema
moduleExports.postProductSchema = [
	{
		id: "productObject",
		type: "object",
		properties: {
			productName: { type: "string" },
			quantity: { type: "number" },
			userId: { type: "string", format: "freedoorId" },
			expectedOffer: { type: "string" },
			productDesc: { type: "string" },
			productExpiryDate: { type: "number" },
			isValid: { type: "number" },
			categoryId: { type: "string", format: "freedoorId" },
			lastUpdated: { type: "number" }
		},
		required: ["productName", "userId", "categoryId"]
	}
]

// PUT product object request body schema
moduleExports.putProductSchema = [
	{
		id: "productPutObject",
		type: "object",
		properties: {
			productId: { type: "string" },
			productName: { type: "string" },
			quantity: { type: "number" },
			userId: { type: "string", format: "freedoorId" },
			expectedOffer: { type: "string" },
			productDesc: { type: "string" },
			productExpiryDate: { type: "number" },
			isValid: { type: "number" },
			categoryId: { type: "string", format: "freedoorId" },
			lastUpdated: { type: "number" }
		},
		required: ["productId", "productName", "userId", "categoryId"]
	}
]

moduleExports.postOfferSchema = [
	{
		id: "offerObject",
		type: "object",
		properties: {
			buyingQty: { type: "number" },
			offeredDetails: { type: "string" },
			buyerStatus: { type: "string" },
			sellerStatus:  { type: "string" },
			offerExpiry: { type: "number" },
			productId: { type: "string", format: "freedoorId" },
			buyerId: { type: "string", format: "freedoorId" },
			lastModified: { type: "number" },
			comments: { type: "array" }
		},
		required: ["productId", "buyerId"]
	}
]

moduleExports.putOfferSchema = [
	{
		id: "offerPutObject",
		type: "object",
		properties: {
			offerId: { type: "string", format: "freedoorId" },
			buyingQty: { type: "number" },
			offeredDetails: { type: "string" },
			buyerStatus: { type: "string" },
			sellerStatus:  { type: "string" },
			offerExpiry: { type: "number" },
			productId: { type: "string", format: "freedoorId" },
			buyerId: { type: "string", format: "freedoorId" },
			lastModified: { type: "number" },
			comments: { type: "array"}
		},
		required: ["offerId", "productId", "buyerId"]
	}
]

moduleExports.postCommentSchema = [
	{
		id: "commentObject",
		type: "object",
		properties: {
			userId: { type: "string", format: "freedoorId" },
			comment: { type: "string" }
		},
		required: ["userId"]
	}
]

// Export the module json
module.exports = moduleExports;