import Tours from "../models/Tours.js";
import Reviews from "../models/Reviews.js";
import Users from "../models/Users.js";
import AppError from "../utils/appError.js";
import Bookings from "../models/Bookings.js";

export const getOverview = async (req, res)=>{
	const tours = await Tours.find({ secretTour: { $ne: true } });
	res.status(200).render("overview", {
		tours,
		h1title: "Popular Tours",
		title: "Natours"
	});
}

export const getTour = async (req, res, next)=>{
	const slug = req.params.slug;
	const selectedTour = await Tours.findOne({ slug }).populate({
		path: "guides",
		select: "-__v -passwordChangedAt -password -role"
	});
	if(!selectedTour){
		return next(new AppError("Tour not Found", 404));
	}
	const reviews = await Reviews.find({ tour: selectedTour._id }).populate({
		path: "user",
		select: "name photo"
	});
	selectedTour.reviews = reviews;
	res.status(200).render("tour", {
		title: selectedTour.name + " | Natours",
		tour: selectedTour
	});
}

export const getLoginForm = (req, res)=>{
	res.status(200).render("login", {
		title: "Log In | Natours"
	});
}

export const getMe = (req, res)=>{
	res.status(200).render("user", {
		title: "Account | Natours"
	});
}

export const getBookings = async (req, res)=>{
	// (1) Find All Bookings of the Current User
	const bookings = await Bookings.find({ user: req.user.id });
	// (2) Find Tours with the returned ids
	const tourIds = bookings.map(e => e.tour);
	const tours = await Tours.find({ _id: { $in: tourIds } });

	res.status(200).render("overview", { 
		title: "Booked Tours | Natours",
		h1title: "Tours you\'ve booked",
		tours
	});
}