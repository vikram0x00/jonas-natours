import { useState } from "react";
import TourContext from "./TourContext";

type Tours = {
	id: string
	name: string
	duration: number
	maxGroupSize: number
	ratingsAverage: number
	ratingsQuantity: number
	price: number
	summary: string
	imageCover: string
	locations: number
	slug: string
}[];

const TourState = (props: any)=>{
	const [tours, setTours] = useState<Tours>([]);

	const loadTours = async (url: string)=>{
		const response = await fetch(url, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const json = await response.json();
		if(json.status === "success"){
			setTours(json.data.json);
		}
	}

	return <TourContext.Provider value={{ tours, setTours, loadTours }}>
		{props.children}
	</TourContext.Provider>
}

export default TourState;