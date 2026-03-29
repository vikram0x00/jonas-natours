import { Schema, model } from "mongoose";
import validator from "validator";

// Validators format
// validate: { validator: function(value), message: errorMessage }
// validate: [function, message]

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
		validate: [validator.isEmail, "Please Enter a valid Email Address"]
	},
	photo: String,
	password: {
		type: String,
		required: [true, "A User must provide a password"],
		minlength: [8, "Please Enter atleast 8 characters"]
	},
	// Useless Field
	// passwordConfirm: {
	// 	type: String,
	// 	validate: {
	// 		validator: function(value){
	// 			return this.password === value;
	// 		},
	// 		message: "Both Password and Confirm Password should match"
	// 	}
	// },
	role: {
		type: String,
		enum: ["user", "guide", "lead-guide", "admin"],
		default: "user"
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: String,
	active: {
		type: Boolean,
		default: true,
		select: false
	}
});

export default model("Users", userSchema);