import Users from "../models/Users.js";
import AppError from "../appError.js";

export const getAllUsers = async (req, res) => {
	const users = await Users.find({ active: { $ne: false } }).select("-password");
	res.status(200).json({
		status: "success",
		results: users.length,
		data: { users }
	});
}

export const updateMe = async (req, res, next)=>{
	// (1) Throw Error if User tries to Update Password
	if(req.body.password){
		return next(new AppError("This Route cannot be used to modify password. Please use /updatePassword or /forgotPassword insteead", 400));
	}
	// (2) If not, update user document
	const excluded = ["role", "passwordResetToken", "passwordResetExpires", "password", "passwordChangedAt"];
	excluded.forEach(e => delete req.body[e]);
	const updatedUser = await Users.findByIdAndUpdate(req.user.id, { ...req.body }, { runValidators: true, returnDocument: "after" });
	res.status(201).json({
		status: "success",
		message: "User Credentials successfully updated",
		data: { updatedUser }
	});
}

export const deleteMe = async (req, res, next)=>{
	await Users.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: "success",
		data: "null"
	});
}

export const getUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });
export const createUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });
export const updateUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });
export const deleteUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });