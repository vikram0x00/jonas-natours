// Change User Details
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const saveUserBtn = document.getElementById("save");

// Change Password
const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const savePassBtn = document.getElementById("savePass");

// notifElement already declared at logout.js

const UPDATE_API_URL = "http://localhost:3000/api/v1/users/updateMe";
const PASSWORD_API_URL = "http://localhost:3000/api/v1/users/updatePassword";

// triggerNotification already declared at logout.js

// Change User Details
saveUserBtn.addEventListener("click", async ()=>{
	if(nameField.getAttribute("data-prefill") === nameField.value && emailField.getAttribute("data-prefill") === emailField.value){
		triggerNotification("No Details Changed!");
		return;
	}
	else{
		try {
			const response = await fetch(UPDATE_API_URL, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: emailField.value,
					name: nameField.value
				})
			});
			if((await response).status === 201) triggerNotification("Details Updated Successfully");
			else triggerNotification("Error. Something unexpected happened!");
			location.assign("/me");
		} catch (error) {
			triggerNotification(error.message || "Something unexpected happened");
			console.log(error);
		}
	}
});

// Change Password
savePassBtn.addEventListener("click", async (e)=>{
	try {
		if(!newPassword.value || !currentPassword.value) triggerNotification("Please enter your password and new password");
		e.target.innerText = "UPDATING...";
		const response = await fetch(PASSWORD_API_URL, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password: currentPassword.value,
				newPassword: newPassword.value
			})
		});
		if ((await response).status === 201) triggerNotification("Password Updated Successfully");
		else triggerNotification("Error. Something unexpected happened!");
		currentPassword.value = "";
		newPassword.value = "";
		e.target.innerText = "SAVE";
	} catch (error) {
		triggerNotification(error.message || "Something unexpected happened");
		console.log(error);
	}
});