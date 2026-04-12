import Tours from "../models/Tours.js";

export const getOverview = async (req, res)=>{
	const tours = await Tours.find({ secretTour: { $ne: true } });
	res.status(200).render("overview", {
		tours
	});
}

export const getTour = (req, res)=>{
	res.status(200).render("tour", {
		title: "This is a Tour Page"
	});
}