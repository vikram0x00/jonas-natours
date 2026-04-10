import { Schema, model } from "mongoose";
import Tours from "./Tours.js";

const reviewsSchema = new Schema({
	review: {
		type: String,
		required: [true, "A review must have some text content"],
		trim: true,
		minlength: 15
	},
	rating: {
		type: Number,
		required: [true, "A review must have a rating"],
		min: 1,
		max: 5
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	tour: {
		type: Schema.Types.ObjectId,
		ref: "Tours",
		required: [true, "A review must have a tourId"]
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
		required: [true, "A review must have a userId"]
	}
});

// Prevent Duplicate Reviews
reviewsSchema.index({ tour: 1, user: 1 }, { unique: true });

// Static Methods
// The methods which are defined on the Schema, and called by the Schema
// Instance methods are the ones defined on a document and called by the document
// The key difference is that Instance is called on doc, Static is called on a Model

reviewsSchema.statics.calcAverageRatings = async function (tourId){
	// `this` is the model itself
	const stats = await this.aggregate([
		{
			$match: { tour: tourId }
		},
		{
			$group: {
				_id: "$tour",
				nRating: { $sum: 1 },
				avgRating: { $avg: "$rating" }
			}
		}
	]);
	await Tours.findByIdAndUpdate(tourId, {
		ratingsQuantity: stats[0].nRating,
		ratingsAverage: stats[0].avgRating
	});
}


reviewsSchema.post("save", async function (next){
	// `this` keyword points to current document
	await this.constructor.calcAverageRatings(this.tour);
});

// findByIdAnd is not a valid thing to query upon*

reviewsSchema.pre(/^findOneAnd/, async function (next){
	// `this` keyword points to the query
	// https://github.com/jonasschmedtmann/complete-node-bootcamp/issues/147#issuecomment-2799069886
	this.r = await this.clone().findOne();
});

reviewsSchema.post(/^findOneAnd/, async function (){
	await this.r.constructor.calcAverageRatings(this.r.tour);
});

export default model("Reviews", reviewsSchema);