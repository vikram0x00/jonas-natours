import { Button } from "@/components/ui/button";
import { MapPin } from "@mynaui/icons-react";
import { Calendar } from "@mynaui/icons-react";
import { Flag } from "@mynaui/icons-react";
import { User } from "@mynaui/icons-react";
import { StarSolid } from "@mynaui/icons-react";
import { Tag } from "@mynaui/icons-react";

type TourItemProps = {
	name: string
	duration: number
	maxGroupSize: number
	ratingsAverage: number
	ratingsQuantity: number
	price: number
	summary: string
	imageCover: string
	locations: number
}

export default function Basic({ imageCover }: TourItemProps) {
	return (
		<div className="overflow-hidden m-2 max-w-96 flex flex-col rounded-2xl border bg-background">
			<div>
				<img src={imageCover} className="w-full" />
			</div>
			<div className="px-4 py-2">
				<h3 className="font-semibold text-lg">The Sea Explorer</h3>
				<p className="text-green-50 text-sm">Exploring the jaw-dropping US east coast by foot and by boat</p>
			</div>
			<div className="px-4 grid-cols-2 grid grid-rows-3 mb-2">
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><MapPin className="mr-1" size={16}/>Miami, FL</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Calendar className="mr-1" size={16}/>June 2027</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Flag className="mr-1" size={16}/>4 stops</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><User className="mr-1" size={16}/>15 people</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><StarSolid className="mr-1" size={16}/>4.1 (18)</div>
				<div className="flex items-center mx-0.5 my-0.5 text-sm"><Tag className="mr-1" size={16}/>$497*</div>
			</div>
			<Button className="mx-2 mb-2">Details</Button>
		</div>
	);
}