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

const Register = () => {
	const [details, setDetails] = useState({ email: "", password: "", name: "" });
	const [alert, setAlert] = useState({ className: "-top-full opacity-0", type: "default", message: "" });
	const redirect = useNavigate();
	const { user } = useContext(AuthContext);

	useEffect(()=>{
		if(user && user.loggedIn){
			redirect("/sign-in");
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
		if(!details.email || !details.password || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(details.email) || !details.name){
			showAlert({ message: "Please fill in all the necessary details", type: "destructive" });
			return;
		}
		try{
			const response = await fetch(import.meta.env.VITE_SIGNUP_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: details.name,
					email: details.email,
					password: details.password
				}),
				credentials: "include"
			});
			const json = await response.json();
			if(json.status === "success"){
				showAlert({ message: "Registration Successful", type: "default" });
				setTimeout(()=>{
					redirect("/sign-in");
				}, 2000);
			}
		}
		catch(error: any){
			showAlert({ message: "An Unexpected Error Occurred: " + error.message, type: "destructive" });
		}
	}

	return (
		<>
			<Header />
			<section className="flex flex-col items-center justify-center gap-10 bg-muted py-5 md:min-h-screen">
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
						<h1 className="text-xl font-bold tracking-tight">
							Create an account
						</h1>
						<p className="mt-1 text-sm text-muted-foreground">
							Get started with Natours today.
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								required
								id="name"
								name="name"
								type="text"
								autoComplete="name"
								placeholder="John Doe"
								value={details.name}
								onChange={onChange}
							/>
							<p className={`${details.name.length < 6 ? "" : "hidden"} text-sm text-muted-foreground`}>
								Must be at least 6 characters long
							</p>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								required
								id="email"
								name="email"
								type="email"
								autoComplete="username"
								placeholder="example@natours.app"
								value={details.email}
								onChange={onChange}
							/>
							<p className={`${!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(details.email) ? "" : "hidden"} text-sm text-muted-foreground`}>
								Please enter a valid email address
							</p>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">New Password</Label>
							<Input
								required
								id="password"
								type="password"
								name="password"
								placeholder="••••••••••"
								autoComplete="current-password"
								value={details.password}
								onChange={onChange}
							/>
							<p className={`${details.password.length < 8 ? "" : "hidden"} text-sm text-muted-foreground`}>
								Must be at least 8 characters long.
							</p>
						</div>
						<Button onClick={handleClick} type="submit" className="w-full">
							Create Account →
						</Button>
					</div>
					<p className="text-sm">
						Already have an account?{" "}
						<Link to="/sign-in" className="underline">
							Sign In
						</Link>
					</p>
				</div>
				<p className="text-sm text-muted-foreground">© 2026 Natours</p>
			</section>
		</>
	)
}

export default Register;