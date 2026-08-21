import Header from "@/components/header1";
import Logo from "@/components/ui/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DangerTriangle, InfoCircle, X } from "@mynaui/icons-react";

const ForgotPassword = ()=>{
	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState({ className: "-top-full opacity-0", type: "default", message: "" });

	useEffect(()=>{
		document.body.addEventListener("keydown", (e)=>{
			if(e.key === "Escape"){
				setAlert({ message: "", type: "", className: "-top-full opacity-0" });
			}
		});
	}, []);

	const showAlert = ({ message, type }: { message: string, type: "default" | "destructive" })=>{
		setAlert({ className: "top-30 opacity-full", message, type });
		setTimeout(()=>{
			setAlert({ className: "-top-full opacity-0", message, type: "default" });
		}, 3000);
	}

	const handleClick = async ()=>{
		if(!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
			showAlert({ message: "Invalid Email Address", type: "destructive" });
			return;
		}
		try {
			const response = await fetch(import.meta.env.VITE_FORGOTPASS, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email })
			});
			await response.json();
			showAlert({ message: "An Email containing the instructions to reset your password has been sent", type: "default" });
		} catch (error: any) {
			showAlert({ message: error.message, type: "destructive" });
		}
	}

	return (
		<>
			<Header/>
			<section className="flex flex-col items-center gap-14 bg-muted py-20 md:min-h-screen">
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
					<h1 className="text-xl font-bold tracking-tight">Reset Password</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Enter your email address and we will send you a link to reset your
						password.
					</p>
				</div>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							required
							id="email"
							type="email"
							autoComplete="username"
							placeholder="example@natours.app"
							value={email}
							onChange={(e)=>setEmail(e.target.value)}
						/>
						<p className={`${!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? "" : "hidden"} text-sm text-muted-foreground`}>
							Please enter a valid Email Address
						</p>
					</div>
					<Button onClick={handleClick} className="w-full">
						Send Reset Email
					</Button>
				</div>
				<p className="text-sm">
					← Back to{" "}
					<Link to="/sign-in" className="underline">
						Login
					</Link>
				</p>
			</div>
			<p className="text-sm text-muted-foreground">© 2026 Natours</p>
		</section>
		</>
	)
}

export default ForgotPassword;