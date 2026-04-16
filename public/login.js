const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const button = document.getElementById("submit_btn");
const notifElement = document.getElementById("notification");

const LOGIN_API_URL = "http://localhost:3000/api/v1/users/login";

const triggerNotification = (message)=>{
	notifElement.getElementsByTagName("span")[0].innerText = message;
	notifElement.classList.remove("hidden");
	setTimeout(() => {
		notifElement.classList.add("hidden");
	}, 4000);
}

const login = async (email, password)=>{
	try {
		const response = await fetch(LOGIN_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password })
		});
		if(!response.ok){
			triggerNotification("An Error Occurred");
		}
		const json = await response.json();
		if(json.status === "success"){
			triggerNotification("Logged In Successfully");
			setTimeout(()=> location.assign("/"), 1000);
		}
		else{
			throw new Error("Incorrect Email or Password");
		}
	} catch (error) {
		triggerNotification(error.message);
	}
}

button.addEventListener("click", async ()=>{
	await login(emailField.value, passwordField.value);
});