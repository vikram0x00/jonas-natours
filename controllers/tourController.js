import { readFileSync, writeFile } from "fs";

// Read Data from json file
const json = JSON.parse(readFileSync("./data/tours.json", "utf-8"));

export const getAllTours = (req, res)=>{
	res.status(200).json({
		status: "success",
		results: json.length,
		data: { json }
	});
}

// Tours Routes
export const createTour = (req, res)=>{
	const newId = json[json.length - 1].id + 1;
	const newTour = Object.assign(req.body, { id: newId });
	json.push(newTour);
	writeFile("./data/tours.json", JSON.stringify(json), (error)=> console.error(error));
	res.status(200).json({
		status: "success",
		tour: { newTour }
	});
}

export const getTour = (req, res)=>{
	const tourId = req.params.id;
	const tour = json.filter(e => e.id == tourId);
	res.status(200).json({
		status: "success",
		data: {
			tour: tour[0]
		}
	});
}

export const updateTour = (req, res)=>{
	const tourId = req.params.id;
	res.status(201).json({
		status: "success",
		message: "<Tour Updated with ID " + tourId + ">"
	});
}

export const deleteTour = (req, res)=>{
	const tourId = req.params.id;
	res.status(204).json({
		status: "success",
		message: "<Tour Deleted with ID " + tourId + ">",
		data: null
	});
}

export const checkId = (req, res, next, value)=>{
	if(tourId > json.length){
		return res.status(404).json({
			status: "error",
			message: "Tour with the id " + tourId + " not found"
		});
	}
	next();
}

export const checkBody = (req, res, next)=>{
	const { name, price } = req.body;
	if(!name || !price){
		return res.status(400).json({
			status: "error",
			message: "req.body is missing either one of the fields name or body"
		});
	}
	else{
		next();
	}
}