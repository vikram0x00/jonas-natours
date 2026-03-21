import Tours from "../models/Tours.js";

export const getAllTours = async (req, res)=>{
	try {
		const json = await Tours.find();
		res.status(200).json({
			status: "success",
			results: json.length,
			data: { json }
		});
	} catch (error) {
		res.status(404).json({
			status: "failed",
			message: error
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
	// if(tourId > json.length){
	// 	return res.status(404).json({
	// 		status: "error",
	// 		message: "Tour with the id " + tourId + " not found"
	// 	});
	// }
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