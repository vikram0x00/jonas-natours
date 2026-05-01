import Users from "../models/Users.js";
import AppError from "../utils/appError.js";
import multer from "multer";
import sharp from "sharp";

// Configure Multer with Disk Storage for Images
// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb)=>{
// 		cb(null, "public/img");
// 	},
// 	filename: (req, file, cb)=>{
// 		// user-userObjectId-timestamp.extension
// 		const ext = file.mimetype.split("/")[1];
// 		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
// 	}
// });

// Multer Filter Configuration to test if the file is an image
const multerFilter = (req, file, cb)=>{
	if(file.mimetype.startsWith("image/")){
		cb(null, true);
	}
	else{
		cb(new AppError("The Uploaded File is not a image. Please Upload an Image", 400), false);
	}
}

// Not specifying destination will keep the image in the memory
const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: multerFilter
});

export const getAllUsers = async (req, res) => {
	const users = await Users.find({ active: { $ne: false } }).select("-password");
	res.status(200).json({
		status: "success",
		results: users.length,
		data: { users }
	});
}

export const updateUserPhoto = upload.single("photo");

export const resizeUserPhoto = (req, res, next)=>{
	if(!req.file) return next();
	req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`
	sharp(req.file.buffer).resize(400, 400).toFormat("jpg").jpeg({ quality: 90 }).toFile(`public/img/${req.file.filename}`);
	next();
}

export const updateMe = async (req, res, next)=>{
	// (1) Throw Error if User tries to Update Password
	if(req.body.password){
		return next(new AppError("This Route cannot be used to modify password. Please use /updatePassword or /forgotPassword instead", 400));
	}
	// (2) If not, update user document
	const excluded = ["role", "passwordResetToken", "passwordResetExpires", "password", "passwordChangedAt"];
	excluded.forEach(e => delete req.body[e]);
	if(req.file) req.body.photo = req.file.filename;
	const updatedUser = await Users.findByIdAndUpdate(req.user.id, { ...req.body }, { runValidators: true, returnDocument: "after" }).select("-password -passwordChangedAt");
	res.status(201).json({
		status: "success",
		message: "User Credentials successfully updated",
		data: { updatedUser }
	});
}

export const getMe = async (req, res, next)=>{
	res.status(200).json({
		status: "success",
		data: {
			user: {
				name: req.user.name,
				email: req.user.email,
				id: req.user.id,
				photo: req.user.photo || "no_photo"
			}
		}
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