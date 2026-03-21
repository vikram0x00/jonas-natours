import { Schema, model } from "mongoose";

const tourSchema = new Schema({
	name: {
		type: String,
		required: [true, "A Tour must have a Name"],
		unique: true,
		trim: true
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
		default: 4.5
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: [true, "A Tour Must have a Price"]
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true
	},
	startDates: {
		type: [Date]
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

export default model("Tours", tourSchema);