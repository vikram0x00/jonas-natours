import { Schema, model } from "mongoose";
import { slugify } from "../slugify.js";
// import validator from "validator";

const tourSchema = new Schema({
	name: {
		type: String,
		required: [true, "A Tour must have a Name"],
		unique: true,
		trim: true,
		minlength: [10, "A Tour name must have a minimum length of 10 characters"],
		maxlength: [40, "A Tour name must have a maximum length of 140 characters"],
		// validate: validator.isAlpha
		// validate: [validator.isAlpha, "Error Message"]
	},
	description: {
		type: String,
		required: [true, "A Tour must have a Description"],
		trim: true
	},
	imageCover: {
		type: String,
		required: [true, "A Tour must have a Cover Image"]
	},
	images: {
		type: [String]
	},
	duration: {
		type: Number,
		required: [true, "A Tour must have a Duration"]
	},
	maxGroupSize: {
		type: Number,
		required: [true, "A Tour must have Max Group Size"]
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
		min: [1, "A Tour must have a minimum rating of 1"],
		max: [5, "A Tour must have a maximum rating of 5"]
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: [true, "A Tour Must have a Price"]
	},
	priceDiscount: {
		type: Number,
		// Dont call the function but just specify it
		validate: {
			validator: function (val) {
				// Returns a true or false
				// If true, validated and if false, a ValidateError is thrown
				// this keyword points to current document
				return val < this.price;
			},
			// Access the val argument specified above in any string with ({VALUE})
			message: "Discount Price must be lesser than Tour Price"
		}
	},
	summary: {
		type: String,
		trim: true
	},
	startDates: {
		type: [Date]
	},
	difficulty: {
		type: String, 
		required: [true, "A Tour must have a difficulty of easy, medium or difficult"],
		enum: {
			values: ["easy", "medium", "difficult"],
			message: "A Tour must have a difficulty of easy, medium or difficult"
		}
	},
	slug: String,
	secretTour: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

// This is a Pre Save Hook or a Middleware
// This runs before the document is saved and this keyword provides access to the document
tourSchema.pre("save", function(next){
	this.slug = slugify(this.name);
	next();
});

// Query Middleware
// This runs on the query of the database or the collection
// https://mongoosejs.com/docs/middleware.html#types-of-middleware

tourSchema.pre(/^find/, function(next){
	// this keyword returns a query, and not a document
	// this keyword can be chained with methods for more querying operations
	// De-select secret tours
	this.find({ secretTour: { $ne: true } });
	// REMINDER: DO NOT USE NEXT HERE
});

tourSchema.pre("aggregate", function(next){
	this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
	// REMINDER: DO NOT USE NEXT HERE
});

// Storing properties like duration in weeks in a Database is inefficient
// Virtual properties help to access properties which are not stored in the database based on the logic below
tourSchema.virtual("durationWeeks").get(function (){
	// `this` keyword returns the document
	return this.duration / 7;
});

export default model("Tours", tourSchema);