import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import TourState from "./context/TourState.tsx";
import AuthState from "./context/AuthState.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthState>
			<TourState>
				<BrowserRouter>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</BrowserRouter>
			</TourState>
		</AuthState>
	</StrictMode>
);