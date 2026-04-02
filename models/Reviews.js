import { Schema, model } from "mongoose";

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

export default model("Reviews", reviewsSchema);