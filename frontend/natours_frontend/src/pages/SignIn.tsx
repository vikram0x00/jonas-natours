import Header from "@/components/header1";
import Logo from "@/components/ui/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DangerTriangle, InfoCircle, X } from "@mynaui/icons-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";

const SignIn = () => {
	const [details, setDetails] = useState({ email: "", password: "" });
	const [alert, setAlert] = useState({ className: "-top-full opacity-0", type: "default", message: "" });
	const redirect = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	useEffect(()=>{
		if(user && user.loggedIn){
			redirect("/tours");
		}
	}, []);

	useEffect(()=>{
		document.body.addEventListener("keydown", (e)=>{
			if(e.key === "Escape"){
				setAlert({ message: "", type: "", className: "-top-full opacity-0" });
			}
		});
	}, []);

	const onChange = (e: any)=>{
		setDetails({...details, [e.target.name]: e.target.value});
	}

	const showAlert = ({ message, type }: { message: string, type: "default" | "destructive" })=>{
		setAlert({ className: "top-30 opacity-full", message, type });
		setTimeout(()=>{
			setAlert({ className: "-top-full opacity-0", message, type: "default" });
		}, 2000);
	}

	const handleClick = async ()=>{
		if(!details.email || !details.password || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(details.email)){
			showAlert({ message: "Please fill in all the necessary details", type: "destructive" });
			return;
		}
		const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: details.email,
				password: details.password
			})
		});
		const json = await response.json();
		if(json.status === "success"){
			showAlert({ message: "Registration Successful", type: "default" });
			setUser({ loggedIn: true, name: json.data.name, email: json.data.email, id: json.data.id });
			setTimeout(()=>{
				redirect("/tours");
			}, 2000);
		}
	}

	return (
		<>
			<Header />
			<section className="flex flex-col items-center gap-10 bg-muted py-20 md:min-h-screen">
				{/* @ts-ignore */}
				<Alert className={`max-w-3xl absolute transition-all flex items-center ${alert.className}`} variant={alert.type!}>
					{alert.type === "destructive" && <DangerTriangle size={16}/>}
					{alert.type === "default" && <InfoCircle size={16}/>}
					<AlertTitle>{alert.message}</AlertTitle>
					<Button
					onClick={()=>{ setAlert({ message: "", type: "", className: "-top-full opacity-0" }) }}
					className={buttonVariants({ size: "icon", variant: "outline", className: "ml-auto" })}><X/></Button>
				</Alert>
				<img src={Logo} alt="Natours" />
				<div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border bg-background p-6">
					<div>
						<h1 className="text-xl font-bold tracking-tight">Sign In</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							Enter your details below to login
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								required
								id="email"
								type="email"
								name="email"
								autoComplete="username"
								placeholder="example@natours.app"
								onChange={onChange}
							/>
							<p className={`${!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(details.email) ? "" : "hidden"} text-sm text-muted-foreground`}>
								Must be at least 6 characters long
							</p>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								required
								id="password"
								name="password"
								type="password"
								placeholder="••••••••••"
								autoComplete="current-password"
								onChange={onChange}
							/>
						</div>
						<Button onClick={handleClick} type="submit" className="w-full">
							Login
						</Button>
						<Button variant="outline" className="w-full">
							Login with Google
						</Button>
					</div>
					<div className="flex flex-col gap-4 text-sm">
						<p>
							Don't have an account?{" "}
							<Link to="/register" className="underline">
								Register
							</Link>
						</p>
						<Link to="/forgot-password" className="underline">
							Forgot your password?
						</Link>
					</div>
				</div>
				<p className="text-sm text-muted-foreground">© 2026 Natours</p>
			</section>
		</>
	)
}

export default SignIn;