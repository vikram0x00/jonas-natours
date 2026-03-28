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
	const user = await Users.findOne({ email }).select("password");
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

export const protect = async (req, res, next)=>{
	// (1) Getting Token
	let token;
	if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
		token = req.headers.authorization.split(" ")[1];
	}
	if(!token){
		return next(new AppError("Unauthorized. Please Log In", 401));
	}
	// (2) Verifying Token
	const data = jwt.verify(token, process.env.JWT_SECRET);
	/**
	 * There are few errors thrown if the data cannot be decoded or verified
	 * JsonWebTokenError - Algorithm set to none or manipulated signature
	 * TokenExpiredError - If the JWT Token has expired, technically similar to logout
	 */
	// (3) Check if user exists in DB
	const user = await Users.findById(data.id);
	if(!user){
		return next(new AppError("This user does not exist", 401));
	}
	// (4) Check if user changed password after the token was issued
	if(user.passwordChangedAt){
		const jwtIssuedAt = data.iat * 1000;
		const passChangeAt = new Date(user.passwordChangedAt).getTime();
		if(passChangeAt > jwtIssuedAt){
			return next(new AppError("You have changed your password. Log In Again", 401));
		}
	}
	// If all the above challenges pass, the route will allow the access to the protected route
	req.user = {
		// _id returns ObjectId and id returns string
		id: user.id,
		name: user.name,
		email: user.email,
		passwordChangedAt: user.passwordChangedAt || null,
		role: user.role || "user"
	}
	next();
}

export const restrictTo = (...roles)=>{
	// The above spread operator returns an array roles[]
	return (req, res, next)=>{
		if(!roles.includes(req.user.role)){
			return next(new AppError("You are not authorized to perform this action", 403));
		}
		next();
	}
}