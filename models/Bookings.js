import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
	tour: {
		type: Schema.Types.ObjectId,
		ref: "Tours",
		required: [true, "Booking Must belong to a Tour ID"]
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
		required: [true, "Booking Must belong to a User ID"]
	},
	price: {
		type: Number,
		required: [true, "Booking Must have a price"]
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	paid: {
		type: Boolean,
		default: true
	}
});

bookingSchema.pre(/^find/, function (next){
	this.populate("user").populate({
		path: "tour",
		select: "name"
	});
});

export default model("Bookings", bookingSchema);