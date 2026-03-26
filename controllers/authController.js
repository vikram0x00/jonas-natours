import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import AppError from "../appError.js";
import bcrypt from "bcrypt";

config();

const JWT_SECRET = process.env.JWT_SECRET;

const signJWTToken = (id) =>{
	return jwt.sign({ id }, JWT_SECRET, {
		expiresIn: "30d"
	});
}

export const signUp = async (req, res, next)=>{
	const { name, password, email, passwordConfirm } = req.body;
	const newUser = await Users.create({ name, email, password, passwordConfirm });
	const token = signJWTToken(newUser._id);

	res.status(201).json({
		status: "success",
		token,
		data: { newUser }
	});
}

export const login = async (req, res, next)=>{
	const { email, password } = req.body;
	// Check if email and password exist
	if(!email || !password){
		return next(new AppError("Invalid Email or Password Sent", 400));
	}
	// Check if a valid user with that email exists
	const user = await Users.findOne({ email }).select("+password");
	if(!user){
		return next(new AppError("No account found with that email", 404));
	}
	/**
	 * [1] Compare Bcrypt 
	 * [2] Verify JWT
	 * Throw Corresponding Error if any of the one above does not pass
	 * If both pass, send the user back a JWT token
	 */
	const passwordCorrect = await bcrypt.compare(password, user.password);
	if(!passwordCorrect){
		return next(new AppError("The Email or the Password is incorrect", 401));
	}
	const token = signJWTToken(user._id);
	res.status(200).json({
		status: "success",
		token
	});
}