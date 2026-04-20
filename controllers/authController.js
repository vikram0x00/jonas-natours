import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

config();

const JWT_SECRET = process.env.JWT_SECRET;

const signJWTToken = (id) =>{
	return jwt.sign({ id }, JWT_SECRET, {
		expiresIn: "30d"
	});
}

export const signUp = async (req, res, next)=>{
	const { name, password, email, role } = req.body;
	const hashedPass = await bcrypt.hash(password, 10);
	const newUser = await Users.create({ name, email, password: hashedPass, role });
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
	// Unsecured HTTP Token, do not use in Production environments without HTTPS
	res.cookie("jwt", token, {
		expiresIn: Date.now() + 2592000000
	});
	delete user.password;
	res.status(200).json({
		status: "success",
		token,
		data: { user }
	});
}

// In a Token based Authentication system, there is no need for a logout route on the API
// The logic is to send back a cookie with the same name as the token cookie which we used while login 
// And also set the expiration time of the cookie to 1 second from now, which makes it get deleted from the browser 
// and the user has to login again to continue
export const logout = async (req, res)=>{
	res.cookie("jwt", "", {
		expiresIn: Date.now() + 1000
	});
	res.status(200).json({
		status: "success",
		message: "Logged Out Successfully"
	});
}

export const protect = async (req, res, next)=>{
	// (1) Getting Token
	let token;
	if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
		token = req.headers.authorization.split(" ")[1];
	}
	else if(req.cookies.jwt){
		token = req.cookies.jwt;
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
		_id: user._id,
		name: user.name,
		email: user.email,
		photo: user.photo,
		passwordChangedAt: user.passwordChangedAt || null,
		role: user.role || "user"
	}
	next();
}

export const isLoggedIn = async (req, res, next)=>{
	let token;
	if(req.cookies.jwt){
		token = req.cookies.jwt;
	}
	if(!token){
		return next();
	}
	// (1) Verifying Token
	const data = jwt.verify(token, process.env.JWT_SECRET);
	// (2) Check if user exists in DB
	const user = await Users.findById(data.id);
	if(!user){
		return next();
	}
	// (3) Check if user changed password after the token was issued
	if(user.passwordChangedAt){
		const jwtIssuedAt = data.iat * 1000;
		const passChangeAt = new Date(user.passwordChangedAt).getTime();
		if(passChangeAt > jwtIssuedAt){
			return next();
		}
	}
	// User is Logged In
	// If all the above challenges pass, the route will allow the access to the protected route
	res.locals.user = {
		// _id returns ObjectId and id returns string
		id: user.id,
		_id: user._id,
		name: user.name,
		email: user.email,
		photo: user.photo,
		passwordChangedAt: user.passwordChangedAt || null,
		role: user.role || "user"
	}
	return next();
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

export const forgotPassword = async (req, res, next)=>{
	// (1) Get User from the email in the re.body
	if(!req.body.email){
		return next(new AppError("No Email Provided", 401));
	}
	const user = await Users.findOne({ email: req.body.email });
	// Just send a dummy response for both user found and not found cases
	// User not found, return dummy response. This is to avoid building of checkers for our API
	if(!user){
		return res.status(200).json({
			status: "success",
			message: "An Email containing the password reset URL has been sent to your mail address if it exists on the server. Make sure to check your Inbox and the Spam folder"
		});	
	}
	// (2) Generate random reset token
	const resetToken = crypto.randomBytes(32).toString("hex");
	const passObj = {
		passwordResetToken: crypto.createHash("sha256").update(resetToken).digest("hex"),
		passwordResetExpires: Date.now() + (10 * 60 * 1000)
	}
	await Users.findByIdAndUpdate(user.id, passObj);
	// (3) Send it to the users email
	const resetUrl = `${req.protocol}://${req.host}/api/v1/users/resetPassword/${resetToken}`;
	await sendEmail({
		email: req.body.email,
		subject: "Password Reset Request for " + req.body.email,
		text: "There was a Password Reset Request for your account. Click the below link to reset your password. This link is valid for the next 10 minutes\n\n" + resetUrl + "\n\nNot you? Ignore this email"
	});
	await res.status(200).json({
		status: "success",
		message: "An Email containing the password reset URL has been sent to your mail address if it exists on the server. Make sure to check your Inbox and the Spam folder"
	});
}

export const resetPassword = async (req, res, next)=>{
	// (1) Get user based on token
	const token = req.params.token;
	const password = req.body.password;
	if(!token){
		return next(new AppError("No Reset Token Found", 401));
	}
	if(!password || password.length < 8){
		return next(new AppError("No password found or password length is too short", 400));
	}
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
	const user = await Users.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gte: Date.now() } });
	// (2) If Token has not expired and the user exists, set the new password
	if(!user){
		return next(new AppError("Token has expired or is invalid", 400));
	}
	// (3) Update changedPasswordAt
	const updatedDetails = {
		password: await bcrypt.hash(password, 10),
		// Minus a second for the database latency
		passwordChangedAt: Date.now() - 1000,
		$unset: { 
			passwordResetToken: 1,
			passwordResetExpires: 1
		}
	}
	await Users.findByIdAndUpdate(user.id, updatedDetails, {
		runValidators: true
	});
	// (4) Log User In Again
	// IMPORTANT: use _id for JWT and id for normal operations
	const jwtToken = signJWTToken(user._id);
	res.status(201).json({
		status: "success",
		message: "Your Password has been successfully reset",
		token: jwtToken
	});
}

export const updatePassword = async (req, res, next)=>{
	// (1) Get user from Database via previous Middleware data
	const user = await Users.findOne({ _id: req.user.id });
	if(!user){
		return next(new AppError("This user does not exist", 401));
	}
	if(!req.body.password || !req.body.newPassword){
		return next(new AppError("Password or New Password missing", 401));
	}
	if(req.body.newPassword.length < 8){
		return next(new AppError("Password or New Password missing", 401));
	}
	if(req.body.password === req.body.newPassword){
		return next(new AppError("Enter a different password than the original old password", 400));
	}
	// (2) Check if the password matches the real password
	const passMatched = await bcrypt.compare(req.body.password, user.password);
	if(!passMatched){
		return next(new AppError("The Password you sent and the password you have set for your account do not match. If you have forgotten your original password, try resetting it.", 400));
	}
	// (3) If it is, change password, else throw error
	await Users.findByIdAndUpdate(user.id, {
		password: await bcrypt.hash(req.body.newPassword, 10),
		passwordChangedAt: Date.now() - 1000
	});
	// (4) Regen JWT Token, send it to the client
	const jwtToken = signJWTToken(user._id);
	res.status(200).json({
		status: "success",
		message: "Password Updated Successfully",
		token: jwtToken
	});
}