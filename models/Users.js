import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
	passwordConfirm: {
		type: String,
		validate: {
			validator: function(value){
				return this.password === value;
			},
			message: "Both Password and Confirm Password should match"
		}
	},
	role: {
		type: String,
		enum: ["user", "guide", "lead-guide", "admin"],
		default: "user"
	},
	passwordChangedAt: Date
});

userSchema.pre("save", async function(next){
	if(!this.isModified("password")){
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10); 
	this.passwordConfirm = undefined;
});

export default model("Users", userSchema);