import { useEffect, useContext, useState } from "react";
import TourContext from "@/context/TourContext";
import AuthContext from "@/context/AuthContext";
import NotFound from "@/components/4041";
import Header from "@/components/header1";
import { useParams, useNavigate } from "react-router";
import { MapPin, Calendar, Flag, User, Star, Tag } from "@mynaui/icons-react";

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

	console.log(tour);

	return (
		<>
			<Header/>
			{!tour && <NotFound type="Tour"/>}
			{tour && <>
			<section style={{ background: `url("http://localhost:3000/img/${tour.imageCover}")` }} className="h-screen w-full flex items-center justify-center flex-col bg-center bg-cover">
				<h1 className="bg-black p-1 text-4xl font-semibold tracking-tighter">{tour.name}</h1>
			</section>
			<section className="flex items-center justify-center p-4">
					<div className="w-full m-2 rounded-2xl p-3 border bg-background">
						<h1 className="font-medium text-lg mb-1">About this Tour</h1>
						<p className="text-sm">{tour.description}</p>
					</div>
					<div className="w-full m-2 rounded-2xl p-3 border bg-background">
						<h1 className="font-medium text-lg mb-1">Tour Info</h1>
						<span><MapPin className="mr-1" size={16}/>{tour.startLocation.description}</span>
						<span><Calendar className="mr-1" size={16}/>{tour.startDates[0]}</span>
						<span><Flag className="mr-1" size={16}/>{tour.locations}</span>
						<span><User className="mr-1" size={16}/>{tour.maxGroupSize}</span>
						<span><Star className="mr-1" size={16}/></span>
						<span><Tag className="mr-1" size={16}/></span>
					</div>
					<div className="w-full m-2 rounded-2xl p-3 border bg-background">
						<h1 className="font-medium text-lg mb-1">Tour Guides</h1>
						<p className="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus neque similique magnam! Porro adipisci sed voluptates quidem facilis iusto, eos incidunt, fugit laborum doloribus blanditiis. Porro ipsum totam autem dolore!</p>
					</div>
			</section>
			</>}
		</>
	)
}

export default Tour;