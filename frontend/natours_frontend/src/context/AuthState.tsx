import AuthContext from "./AuthContext";
import { useState } from "react";

type User = {
	userId: string,
	name: string,
	email: string
}

const AuthState = (props: any)=>{
	const [user, setUser] = useState<User | null>(null);

	return <AuthContext.Provider value={{ user, setUser }}>
		{props.children}
	</AuthContext.Provider>
}

export default AuthState;