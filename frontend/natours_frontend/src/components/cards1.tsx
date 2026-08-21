import { buttonVariants } from "@/components/ui/button";
import { MapPin } from "@mynaui/icons-react";
import { Calendar } from "@mynaui/icons-react";
import { Flag } from "@mynaui/icons-react";
import { User } from "@mynaui/icons-react";
import { Star } from "@mynaui/icons-react";
import { Tag } from "@mynaui/icons-react";
import { Link } from "react-router";

type TourItemProps = {
	name: string
	id: string
	slug: string
	maxGroupSize: number
	ratingsAverage: number
	ratingsQuantity: number
	price: number
	summary: string
	imageCover: string
	locations: any,
	startLocation: string,
	startDate: string
}

export default function Basic({ name, slug, maxGroupSize, ratingsAverage, ratingsQuantity, price, summary, imageCover, locations, startLocation, startDate }: TourItemProps) {
	return (
		<div className="overflow-hidden m-2 max-w-96 flex flex-col rounded-2xl border bg-background">
			<div>
				<img src={"http://localhost:3000/img/" + imageCover} crossOrigin="anonymous" className="w-full max-h-60 min-h-60" />
			</div>
			<div className="px-4 py-2">
				<h3 className="font-semibold text-lg">{name}</h3>
				<p className="text-sm">{summary}</p>
			</div>
			<div className="px-4 grid-cols-2 grid grid-rows-3 mb-2">
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><MapPin className="mr-1" size={16}/>{startLocation}</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Calendar className="mr-1" size={16}/>{startDate}</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Flag className="mr-1" size={16}/>{locations.length} stops</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><User className="mr-1" size={16}/>{maxGroupSize} people</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Star className="mr-1" size={16}/>{ratingsAverage} ({ratingsQuantity})</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Tag className="mr-1" size={16}/>${price}*</div>
			</div>
			<Link to={"/tour/" + slug} className={buttonVariants({ variant: "default", className: "mx-2 mb-2" })}>Details</Link>
		</div>
	);
}