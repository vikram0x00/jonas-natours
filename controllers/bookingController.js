import Tours from "../models/Tours.js";
import Bookings from "../models/Bookings.js";
import AppError from "../utils/appError.js";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = async (req, res, next)=>{
	if(!req.params.tourId){
		return next(new AppError("No TourId Found", 400));
	}
	// (1) Get Current Booked Tour
	const tour = await Tours.findById(req.params.tourId);
	if(!tour) return next(new AppError("No Tour with that ID found", 400));
	// (2) Create Checkout Session
	const session = await stripeClient.checkout.sessions.create({
		payment_method_types: ["card"],
		success_url: `http://localhost:3000?tour=${tour.id}&user=${req.user.id}&price=${tour.price}`,
		cancel_url: "http://localhost:3000/tour/" + tour.slug,
		customer_email: req.user.email,
		client_reference_id: req.params.tourId,
		mode: "payment",
		line_items: [
			{
				price_data: {
					unit_amount: tour.price * 100,
					currency: "eur",
					product_data: {
						name: `${tour.name} Tour`,
						description: tour.summary
					}
				},
				quantity: 1
			}
		]
	});
	// (3) Send Session as Response
	res.status(200).json({
		status: "success",
		url: session.url
	});
}

export const createBookingCheckout = async (req, res, next)=>{
	const { tour, user, price } = req.query;
	if(!tour && !user && !price) return next();
	await Bookings.create({ tour, user, price });
	res.redirect("/");
}

export const getAllBookings = async (req, res, next)=>{
	const bookings = await Bookings.find();
	res.status(200).json({
		status: "success",
		data: { bookings }
	});
}

export const getBooking = async (req, res, next)=>{
	if(!req.params.id) return next(new AppError("No Booking ID provided", 400));
	const booking = await Bookings.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: { booking }
	});
}

export const createBooking = async (req, res, next)=>{
	const booking = await Bookings.create({ ...req.body });
	res.status(200).json({
		status: "success",
		data: { booking }
	});
}

export const updateBooking = async (req, res, next)=>{
	if(!req.params.id) return next(new AppError("No Booking ID provided", 400));
	const updatedBooking = await Bookings.findByIdAndUpdate(req.params.id, { ...req.body }, {
		runValidators: true,
		returnDocument: "after"
	});
	res.status(201).json({
		status: "success",
		data: { updatedBooking }
	});
}

export const deleteBooking = async (req, res, next)=>{
	if(!req.params.id) return next(new AppError("No Booking ID provided", 400));
	await Bookings.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success"
	});
}