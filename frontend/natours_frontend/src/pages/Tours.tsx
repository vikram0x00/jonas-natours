import Header from "@/components/header1";
import Card from "@/components/cards1";
import imageLink from "@/components/ui/tour-1-1.jpg";

const Tours = ()=>{
	return (
		<>
			<Header/>
			<section className="px-4 py-4 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-semibold mx-auto my-4">Explore All Tours</h1>
				<section className="w-full mx-auto flex flex-wrap items-center justify-center max-w-7xl">
					<Card imageCover={imageLink}></Card>
					<Card imageCover={imageLink}></Card>
					<Card imageCover={imageLink}></Card>
					<Card imageCover={imageLink}></Card>
					<Card imageCover={imageLink}></Card>
					<Card imageCover={imageLink}></Card>
				</section>
    		</section>
		</>
	)
}

export default Tours;