// Change User Details
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const photoField = document.getElementById("profile");
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
saveUserBtn.addEventListener("click", async (e)=>{
	if(nameField.getAttribute("data-prefill") === nameField.value && emailField.getAttribute("data-prefill") === emailField.value && photoField.files.length === 0){
		triggerNotification("No Details Changed!");
		return;
	}
	else if(photoField.files.length !== 0){
		saveUserBtn.innerText = "UPDATING...";
		try {
			const form = new FormData();
			form.append("photo", photoField.files[0]);
			const response = await fetch(UPDATE_API_URL, {
				method: "PATCH",
				body: form
			});
			if((await response).status === 201) triggerNotification("Details Updated Successfully");
			else triggerNotification("Error. Something unexpected happened!");
			location.assign("/me");
		} catch (error) {
			triggerNotification(error.message || "Something unexpected happened");
			console.log(error);
		}
		saveUserBtn.innerText = "SAVE";
	}
	else{
		saveUserBtn.innerText = "UPDATING...";
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
		saveUserBtn.innerText = "SAVE";
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