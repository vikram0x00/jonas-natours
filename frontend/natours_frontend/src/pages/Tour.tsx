import { useEffect, useContext, useState } from "react";
import TourContext from "@/context/TourContext";
import AuthContext from "@/context/AuthContext";
import NotFound from "@/components/4041";
import Header from "@/components/header1";
import { useParams, useNavigate } from "react-router";
import { MapPin, Calendar, Flag, User, Star, Tag } from "@mynaui/icons-react";
import { Map, MapStyle, Marker } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

type Tour = {
	createdAt: string,
	description: string,
	difficulty: string,
	duration: number,
	durationWeeks: number,
	guides: any[],
	id: string,
	imageCover: string,
	images: string[],
	locations: any[],
	maxGroupSize: number,
	name: string,
	price: number,
	ratingsAverage: number,
	ratingsQuantity: number,
	slug: string,
	startDates: string[],
	startLocation:{ type: string, coordinates: any[], description: string },
	summary: string
}

const Tour = ()=>{
	const redirect = useNavigate();
	const { slug } = useParams();

	const { user } = useContext(AuthContext);
	const { tours } = useContext(TourContext);

	const [tour, setTour] = useState<Tour | null>(null);

	useEffect(()=>{
		if(!tours) redirect("/sign-in");
		if(!user) redirect("/sign-in");
	}, []);

	useEffect(()=>{
		setTour(tours.find((e: any) => e.slug === slug));
	}, []);

	useEffect(()=>{
		const map = new Map({
			container: document.getElementById("map")!,
			apiKey: import.meta.env.VITE_MAPTILER_APIKEY,
			style: MapStyle.STREETS
		});
		const marker = new Marker();
		tour?.locations.forEach(loc => {
			marker.setLngLat(loc).addTo(map);
		});
	}, []);

	return (
		<>
			<Header/>
			{!tour && <NotFound type="Tour"/>}
			{tour && <>
			<section style={{ background: `url("http://localhost:3000/img/${tour.imageCover}")` }} className="p-60 mx-6 mt-3 rounded-2xl flex items-center justify-center flex-col bg-center bg-cover">
				<h1 className="bg-black p-1 text-4xl font-semibold tracking-tighter">{tour.name}</h1>
			</section>
			<section className="flex items-center justify-center p-4">
					<div className="w-full m-2 rounded-2xl p-3 border bg-background">
						<h1 className="font-medium text-lg mb-1">About this Tour</h1>
						<p className="text-sm">{tour.description}</p>
					</div>
					<div className="w-full m-2 rounded-2xl p-3 border bg-background">
						<h1 className="font-medium text-lg mb-1">Tour Info</h1>
						<p className="text-sm flex items-center my-1.5"><MapPin className="mr-1" size={16}/>{tour.startLocation.description}</p>
						<p className="text-sm flex items-center my-1.5"><Calendar className="mr-1" size={16}/>{new Date(tour.startDates[0]).toString().slice(4, 15)}</p>
						<p className="text-sm flex items-center my-1.5"><Flag className="mr-1" size={16}/>{tour.locations.length} stops</p>
						<p className="text-sm flex items-center my-1.5"><User className="mr-1" size={16}/>{tour.maxGroupSize} people</p>
						<p className="text-sm flex items-center my-1.5"><Star className="mr-1" size={16}/>{tour.ratingsAverage} ({tour.ratingsQuantity} ratings)</p>
						<p className="text-sm flex items-center my-1.5"><Tag className="mr-1" size={16}/>${tour.price} (per person)</p>
					</div>
					<div className="w-full m-2 rounded-2xl p-3 border bg-background">
						<h1 className="font-medium text-lg mb-1">Tour Guides</h1>
						<p className="text-sm">{tour.description}</p>
					</div>
			</section>
			<section className="flex items-center justify-center flex-col">
				<h1 className="font-medium text-2xl mx-2">Tour Images</h1>
				<div className="flex items-center justify-center">
					<img className="h-72 m-2 rounded-2xl" src={"http://localhost:3000/img/" + tour.images[0]} alt="Tour Image" />
					<img className="h-72 m-2 rounded-2xl" src={"http://localhost:3000/img/" + tour.images[1]} alt="Tour Image" />
					<img className="h-72 m-2 rounded-2xl" src={"http://localhost:3000/img/" + tour.images[2]} alt="Tour Image" />
				</div>
			</section>
			<section className="flex items-center justify-center bg-muted mx-6 flex-col">
				<h1 className="font-medium text-2xl">Tour Map</h1>
				<div id="map" className="flex rounded-2xl bg-muted"></div>
			</section>
			</>}
		</>
	)
}

export default Tour;