const notifElement = document.getElementById("notification");
const logoutButton = document.getElementById("logout");

const LOGOUT_API_URL = "http://localhost:3000/api/v1/users/logout";

const triggerNotification = (message)=>{
	notifElement.getElementsByTagName("span")[0].innerText = message;
	notifElement.classList.remove("hidden");
	setTimeout(() => {
		notifElement.classList.add("hidden");
	}, 4000);
}

logoutButton.addEventListener("click", async ()=>{
	try {
		const response = await fetch(LOGOUT_API_URL);
		if(!response.ok){
			triggerNotification("An Error Occurred");
		}
		const json = await response.json();
		if(json.status === "success"){
			triggerNotification("Logged Out Successfully");
			setTimeout(()=> location.assign("/"), 1000);
		}
	} catch (error) {
		triggerNotification(error.message);
	}
});