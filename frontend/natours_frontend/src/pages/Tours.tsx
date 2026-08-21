import Header from "@/components/header1";
import Card from "@/components/cards1";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import TourContext from "@/context/TourContext";
import { useNavigate } from "react-router";

type Tour = {
	id: string
	name: string
	slug: string
	maxGroupSize: number
	ratingsAverage: number
	ratingsQuantity: number
	price: number
	summary: string
	imageCover: string
	locations: number
	startLocation: any
	startDate: string
}

const Tours = ()=>{
	const { getUserFromToken } = useContext(AuthContext);
	const { tours, loadTours } = useContext(TourContext);
	const redirect = useNavigate();
	
	const [displayTours, setDisplayTours] = useState(tours);

	useEffect(()=>{
		const authToken = document.cookie.split(";").find(e => e.includes("jwt="));
		const nullToken = authToken?.split("=")[1] === "";
		if(!authToken || nullToken) redirect("/sign-in");
		else getUserFromToken(import.meta.env.VITE_GET_USER);
	}, []);

	useEffect(()=>{
		loadTours(import.meta.env.VITE_ALL_TOURS);
	}, []);

	useEffect(()=>{
		setDisplayTours(tours);
	}, [tours])

	return (
		<>
			<Header/>
			<section className="px-4 py-4 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-semibold mx-auto my-4">Explore All Tours</h1>
				<section className="w-full mx-auto flex flex-wrap items-center justify-center max-w-7xl">
					{displayTours && displayTours.map((tour: Tour) =>{
						return <Card 
						id={tour.id}
						key={tour.id}
						name={tour.name}
						slug={tour.slug}
						maxGroupSize={tour.maxGroupSize}
						ratingsAverage={tour.ratingsAverage}
						ratingsQuantity={tour.ratingsQuantity}
						price={tour.price}
						summary={tour.summary}
						imageCover={tour.imageCover}
						locations={tour.locations}
						startLocation={tour.startLocation.description}
						// @ts-ignore
						startDate={new Date(tour.startDates[0]).toLocaleString().split(",")[0]}
						/>
					})}
				</section>
    		</section>
		</>
	)
}

export default Tours;