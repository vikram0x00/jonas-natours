import Tours from "../models/Tours.js";
import AppError from "../utils/appError.js";

/**
 * Express v5 - Automatic Sync and Async Error Handling
 * Any Errors in the Route Handlers are thrown into the Central error handler
 * No need to use Try Catch Everywhere
 * Just use next(error); for custom Error cases
 */

export const aliasTopTours = async (req, res)=>{
	const json = await Tours.find().sort("price -ratingsAverage").select("name description price ratingsAverage difficulty").limit(5);
	res.status(200).json({
		status: "success",
		results: json.length,
		data: { json }
	});
}

export const getMonthlyPlan = async (req, res)=>{
	const year = Number(req.params.year);
	const plan = await Tours.aggregate([
		{
			$unwind: "$startDates"
		},
		{
			$match: { 
				startDates: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`)
				}
			}
		},
		{
			$group: {
				_id: { $month: "$startDates" },
				numTourStarts: { $sum: 1 },
				tours: { $push: "$name" }
			}
		},
		{
			$addFields: { month: "$_id" }
		},
		{
			$project: {
				_id: 0
			}
		},
		{
			$sort: { numTourStarts: -1 }
		},
		{
			$limit: 12
		}
	]);
	res.status(200).json({
		status: "success",
		data: { plan }
	});
}

export const getTourStats = async (req, res)=>{
	const stats = await Tours.aggregate([
		{
			$match: { ratingsAverage: { $gte: 4.5 } }
		},
		{
			$group: { 
				_id: "$difficulty",
				numTours: { $sum: 1 },
				numRatings: { $sum: "$ratingsQuantity" },
				avgRating: { $avg: "$ratingsAverage" },
				avgPrice: { $avg: "$price" },
				minPrice: { $min: "$price" },
				maxPrice: { $max: "$price" }
			}
		}
	]);
	res.status(200).json({
		status: "success",
		data: { stats }
	});
}

export const getAllTours = async (req, res) => {
	// [1A] Clone the Request Query Object
	let queryObject = { ...req.query }

	// [1B] Remove the excluded fields
	const excluded = ["limit", "fields", "sort", "page"];
	excluded.forEach(e => delete queryObject[e]);

	// [2] Convert Operators to MongoDB compatible operators
	// Regex
	let queryString = JSON.stringify(queryObject);
	queryString = queryString.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
	queryString = JSON.parse(queryString);

	// Non-awaited Mongo Query
	let query = Tours.find(queryString);

	// [3] Sorting
	if (req.query.sort) {
		// This method takes a string which is a field in the defined schema
		// Multiple Fields can be specified by a space and then a minus for descending
		// Ascending is by default and a plus would also do that
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	}
	else {
		query = query.sort("-createdAt");
	}
	// [4] Field Limiting 
	if (req.query.fields) {
		const fields = req.query.fields.split(",").join(" ");
		// This method takes fields in the defined Schema as a string seperated by spaces
		query = query.select(fields);
	}
	// -fieldName for excluding the field out of the query result
	else {
		query = query.select("-__v -secretTour");
	}
	// [5] Pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 100;
	const skip = (page - 1) * limit;
	if (req.query.page) {
		const numTours = await Tours.countDocuments();
		if (skip >= numTours) {
			throw new Error("This page does not exist");
		}
	}
	query = query.skip(skip).limit(limit);
	// Await the query and get the Results
	const json = await query;

	res.status(200).json({
		status: "success",
		results: json.length,
		data: { json }
	});
}

// Tours Routes
export const createTour = async (req, res)=>{
	const { name, price, rating, difficulty, maxGroupSize, duration, imageCover, description } = req.body;
	const newTour = await Tours.create({ name, price, rating, difficulty, maxGroupSize, duration, imageCover, description });
	res.status(200).json({
		status: "success",
		tour: { newTour }
	});
}

export const getTour = async (req, res, next)=>{
	const tourId = req.params.id;
	const tour = await Tours.findById(tourId).populate({
		// The field which you want to show documents on
		path: "guides",
		// The fields which you desire to be shown in the populated field
		select: "-__v -passwordChangedAt -password -role"
	}).populate("reviews");
	if(!tour){
		return next(new AppError("Tour Not Found with that ID", 404));
	}
	res.status(200).json({
		status: "success",
		data: {
			tour: tour
		}
	});
}

export const updateTour = async (req, res)=>{
	const tourId = req.params.id;
	const updatedTour = await Tours.findOneAndUpdate({ _id: tourId }, req.body, {
		// Returns the updated Tour Object
		// new: true == DEPRECATED
		returnDocument: "after",
		// Validators for Update are off by default and must specify this in the options for validating
		runValidators: true
	});
	res.status(201).json({
		status: "success",
		message: "Tour Updated",
		data: { updatedTour }
	});
}

export const deleteTour = async (req, res)=>{
	const tourId = req.params.id;
	await Tours.findByIdAndDelete(tourId);
	res.status(204).json({
		status: "success"
	});
}

export const checkId = (req, res, next, value)=>{
	next();
}

export const checkBody = (req, res, next)=>{
	next();
}