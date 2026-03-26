import Users from "../models/Users.js";

export const getAllUsers = async (req, res) => {
	const users = await Users.find().select("-password");
	res.status(200).json({
		status: "success",
		results: users.length,
		data: { users }
	})
};

export const getUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });
export const createUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });
export const updateUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });
export const deleteUser = (req, res)=> res.status(500).json({ status: "error", message: "Route not implemented" });