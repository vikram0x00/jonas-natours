import Reviews from "../models/Reviews.js";
import AppError from "../utils/appError.js";
import Tours from "../models/Tours.js";

export const getAllReviews = async (req, res, next)=>{
	let filter = {};
	if(req.params.id) filter.tour = req.params.id;
	const reviews = await Reviews.find(filter).populate({ path: "user", select: "name photo" }).populate({ path: "tour", select: "name" });
	res.status(200).json({
		status: "success",
		results: reviews.length,
		data: { reviews }
	});
}

export const createReview = async (req, res, next)=>{
	const { user } = req;
	// Do not check for user, because protect middleware does that
	// Checking for user existence is just over-doing it
	const tourId = req.params.id;
	if(!tourId){
		return next(new AppError("Invalid Tour ID Provided", 400));
	}
	const { review, rating } = req.body;
	if(!review || !rating){
		return next(new AppError("Review or Rating not found", 400));
	}
	const tourExists = await Tours.findOne({ _id: tourId });
	if(!tourExists){
		return next(new AppError("No tour found matching the provided tourId", 401));
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

export const updateReview = async (req, res, next)=>{
	const { user } = req;
	const reviewId = req.params.id;
	if(!reviewId){
		return next(new AppError("Invalid Review ID Provided", 400));
	}
	const { review, rating } = req.body;
	if(!review || !rating){
		return next(new AppError("Review or Rating not found", 400));
	}
	const revieww = await Reviews.findOne({ _id: reviewId, user: user._id });
	if(!revieww){
		return next(new AppError("No Review Found with the provided ID", 404));
	}
	const tourExists = await Tours.findOne({ _id: revieww.tour });
	if(!tourExists){
		return next(new AppError("No tour found matching the provided tourId", 401));
	}
	const updatedReview = await Reviews.findByIdAndUpdate(revieww.id, {
		review,
		rating
	}, { 
		returnDocument: "after",
		runValidators: true
	});
	await res.status(201).json({
		status: "success",
		data: {
			review: updatedReview
		}
	});
}

export const deleteReview = async (req, res, next)=>{
	const { user } = req;
	const reviewId = req.params.id;
	if(!reviewId){
		return next(new AppError("Invalid Review ID Provided", 400));
	}
	const review = await Reviews.findOne({ _id: reviewId, user: user._id });
	if(!review){
		return next(new AppError("No Review Found with the provided ID", 404));
	}
	const tourExists = await Tours.findOne({ _id: review.tour });
	if(!tourExists){
		return next(new AppError("No tour found matching the provided tourId", 401));
	}
	await Reviews.findByIdAndDelete(reviewId);
	await res.status(204).json({
		status: "success",
		message: "Deleted Review Successfully"
	});
}