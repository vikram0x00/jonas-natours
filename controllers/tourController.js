import Tours from "../models/Tours.js";

export const aliasTopTours = (req, res, next)=>{
	// req.query is not writable anymore in Express v5
	// Use req.newField instead
	// Is accessed by the next middleware handler
	req.middlewareQuery = {};
	req.middlewareQuery.limit = 5;
	req.middlewareQuery.sort = "-ratingsAverage,price";
	req.middlewareQuery.fields = "name,price,ratingsAverage,description,difficulty";
	next();
}

export const getAllTours = async (req, res)=>{
	try {
		console.log(req.query);
		// [1A] Clone the Request Query Object
		let queryObject = {...req.query}

		// [1B] Remove the excluded fields
		const excluded = ["limit", "fields", "sort", "page"];
		excluded.forEach(e => delete queryObject[e]);
		
		// [2] Convert Operators to MongoDB compatible operators
		// Regex
		let queryString = JSON.stringify(queryObject);
		queryString = queryString.replace(/\b(gte|lte|gt|lt)\b/g, (match)=> `$${match}`);
		queryString = JSON.parse(queryString);
		console.log(queryString);
		
		// Non-awaited Mongo Query
		let query = Tours.find(queryString);

		// [3] Sorting
		if(req.query.sort){
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
		if(req.query.fields){
			const fields = req.query.fields.split(",").join(" ");
			// This method takes fields in the defined Schema as a string seperated by spaces
			query = query.select(fields);
		}
		// -fieldName for excluding the field out of the query result
		else{
			query = query.select("-__v");
		}
		// [5] Pagination
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 100;
		const skip = (page - 1) * limit;
		if(req.query.page){
			const numTours = await Tours.countDocuments();
			if(skip >= numTours){
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
	} catch (error) {
		res.status(404).json({
			status: "failed",
			message: error.message
		});	
	}
}

// Tours Routes
export const createTour = async (req, res)=>{
	try {
		const { name, rating, price } = req.body;
		const newTour = await Tours.create({ name, rating, price });
		res.status(200).json({
			status: "success",
			tour: { newTour }
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error
		});
	}
}

export const getTour = async (req, res)=>{
	try {
		const tourId = req.params.id;
		const tour = await Tours.findById(tourId);
		res.status(200).json({
			status: "success",
			data: {
				tour: tour
			}
		});
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error
		});
	}
}

export const updateTour = async (req, res)=>{
	try {
		const tourId = req.params.id;
		const updatedTour = await Tours.findByIdAndUpdate(tourId, req.body, {
			// Returns the updated Tour Object
			// new: true == DEPRECATED
			returnDocument: "after"
		});
		res.status(201).json({
			status: "success",
			message: "Tour Updated",
			data: { updatedTour }
		});	
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error
		});
	}
}

export const deleteTour = async (req, res)=>{
	try {
		const tourId = req.params.id;
		await Tours.findByIdAndDelete(tourId);
		res.status(204).json({
			status: "success"
		});	
	} catch (error) {
		res.status(400).json({
			status: "failed",
			message: error
		});
	}
}

export const checkId = (req, res, next, value)=>{
	next();
}

export const checkBody = (req, res, next)=>{
	const { name, price, rating } = req.body;
	if(!name && !price && !rating){
		return res.status(400).json({
			status: "error",
			message: "req.body is missing either one of the fields name price or rating"
		});
	}
	else{
		next();
	}
}