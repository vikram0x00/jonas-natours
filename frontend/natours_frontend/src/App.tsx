import Home from "@/pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import NotFound from "@/components/4041";
import ForgotPassword from "./pages/ForgotPassword";
import Tours from "@/pages/Tours";

import { Routes, Route } from "react-router";

export function App() {
  return (
    <>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/tours" element={<Tours/>} />
			<Route path="/register" element={<Register/>} />
			<Route path="/forgot-password" element={<ForgotPassword/>} />
			<Route path="/sign-in" element={<SignIn/>} />
			<Route path="*" element={<NotFound/>} />
			<Route/>
		</Routes>
	</>
  )
}

export default App;