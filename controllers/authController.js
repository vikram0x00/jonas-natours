import Users from "../models/Users.js";

export const signUp = async (req, res, next)=>{
	const newUser = await Users.create(req.body);
	res.status(201).json({
		status: "success",
		data: { newUser }
	});
}