import AuthContext from "./AuthContext";
import { useState } from "react";

type User = {
	userId: string,
	name: string,
	email: string,
	profilePhoto: string,
	loggedIn: boolean
}

const AuthState = (props: any)=>{
	const [user, setUser] = useState<User | null>(null);

	const getUserFromToken = async (url: string)=>{
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		});
		const json = await response.json();
		if(json.status === "success"){
			setUser(json.data);
		}
	}

	return <AuthContext.Provider value={{ user, setUser, getUserFromToken }}>
		{props.children}
	</AuthContext.Provider>
}

export default AuthState;