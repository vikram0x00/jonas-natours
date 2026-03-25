import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "A User must have a name"],
		trim: true
	},
	email: {
		type: String,
		required: [true, "A User must have an email"],
		unique: true,
		lowercase: true,
		validator: [validator.isEmail, "Please Enter a valid Email Address"]
	},
	photo: String,
	password: {
		type: String,
		required: [true, "A User must provide a password"],
		minlength: [8, "Please Enter atleast 8 characters"]
	},
	passwordConfirm: {
		type: String,
		required: true
	}
});

export default model("Users", userSchema);