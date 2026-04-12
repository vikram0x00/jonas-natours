import Tours from "../models/Tours.js";
import AppError from "../utils/appError.js";

export const getOverview = async (req, res)=>{
	const tours = await Tours.find({ secretTour: { $ne: true } });
	res.status(200).render("overview", {
		tours
	});
}

export const getTour = async (req, res, next)=>{
	const slug = req.params.slug;
	const selectedTour = await Tours.findOne({ slug }).populate({
		path: "guides",
		select: "-__v -passwordChangedAt -password -role"
	}).populate("reviews");
	if(!selectedTour){
		return next(new AppError("Tour not Found", 404));
	}
	res.status(200).json(selectedTour);
	// res.status(200).render("tour", {
	// 	tour: selectedTour
	// });
}