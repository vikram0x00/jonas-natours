// Frontend Script
console.log("Natours");
const locations = JSON.parse(document.getElementById("map").dataset.locations).map(e => e.coordinates);

maptilersdk.config.apiKey = "7IZ34aZeMTB6ik0ooI2n";

const map = new maptilersdk.Map({
	container: "map",
	style: maptilersdk.MapStyle.STREETS,
	center: locations[0],
	zoom: 5
});

for(let i=0;i<locations.length;i++){
	const marker = new maptilersdk.Marker();
	marker.setLngLat(locations[i]).addTo(map);
}