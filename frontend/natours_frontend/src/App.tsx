import Home from "@/pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import NotFound from "@/components/4041";
import ForgotPassword from "./pages/ForgotPassword";
import Tours from "@/pages/Tours";
import Tour from "@/pages/Tour";

import { Routes, Route } from "react-router";

export function App() {
  return (
    <>
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/tours" element={<Tours/>} />
			<Route path="/register" element={<Register/>} />
			<Route path="/forgot-password" element={<ForgotPassword/>} />
			<Route path="/tour/:slug" element={<Tour/>} />
			<Route path="/sign-in" element={<SignIn/>} />
			<Route path="*" element={<NotFound type="Page"/>} />
			<Route/>
		</Routes>
	</>
  )
}

export default App;