const bookTourButton = document.getElementById("bookTour");

const BOOKINGS_API_URL = "http://localhost:3000/api/v1/bookings/checkout-session/";

bookTourButton.addEventListener("click", async ()=>{
	bookTourButton.innerText = "PROCESSING...";
	try {
		const url = BOOKINGS_API_URL + bookTourButton.getAttribute("data-tourid");
		const response = await fetch(url);
		if(!response.ok) return triggerNotification("Something went wrong while booking the tour. Try again later");
		const json = await response.json();
		window.location.href = json.url;
	} catch (error) {
		triggerNotification(error.message);
	}
});