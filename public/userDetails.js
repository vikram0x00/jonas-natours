// Change User Details
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const saveUserBtn = document.getElementById("save");

// Change Password
const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const savePassBtn = document.getElementById("savePass");

const notifElement = document.getElementById("notification");

const UPDATE_API_URL = "http://localhost:3000/updateMe";
const PASSWORD_API_URL = "http://localhost:3000/updatePassword";

const triggerNotification = (message)=>{
	notifElement.getElementsByTagName("span")[0].innerText = message;
	notifElement.classList.remove("hidden");
	setTimeout(() => {
		notifElement.classList.add("hidden");
	}, 4000);
}

// Change User Details
saveUserBtn.addEventListener("click", async ()=>{
	if(nameField.getAttribute("data-prefill") === nameField.value && emailField.getAttribute("data-prefill") === emailField.value){
		triggerNotification("No Details Changed!");
		return;
	}
	else{
		
	}
});