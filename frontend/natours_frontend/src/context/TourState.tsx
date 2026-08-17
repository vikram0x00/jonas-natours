import { useState } from "react";
import TourContext from "./TourContext";

type Tours = {
	name: string
	duration: number
	maxGroupSize: number
	ratingsAverage: number
	ratingsQuantity: number
	price: number
	summary: string
	imageCover: string
	locations: number
}[];

const TourState = (props: any)=>{
	const [tours, setTours] = useState<Tours>([]);

	return <TourContext.Provider value={{ tours, setTours }}>
		{props.children}
	</TourContext.Provider>
}

export default TourState;