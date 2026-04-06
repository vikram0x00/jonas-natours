import Reviews from "../models/Reviews.js";
import AppError from "../utils/appError.js";
import Tours from "../models/Tours.js";

export const getAllReviews = async (req, res, next)=>{
	const reviews = await Reviews.find().populate({ path: "user tour" });
	res.status(200).json({
		status: "success",
		results: reviews.length,
		data: { reviews }
	});
}

export const createReview = async (req, res, next)=>{
	const { user } = req;
	if(!user){
		return next(new AppError("Please Log In to Create a Review", 400));
	}
	console.log(user);
	const tourId = req.params.id;
	if(!tourId){
		return next(new AppError("Invalid Tour ID Provided", 400));
	}
	const tourExists = await Tours.findOne({ _id: tourId });
	if(!tourExists){
		return next(new AppError("No tour found matching the provided tourId", 401));
	}
	const { review, rating } = req.body;
	if(!review || !rating){
		return next(new AppError("Review or Rating not found", 400));
	}
	const newReview = await Reviews.create({
		review,
		rating,
		tour: tourId,
		user: user._id
	});
	await res.status(200).json({
		status: "success",
		data: {
			newReview
		}
	});
}