import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import TourState from "./context/TourState.tsx";
import AuthState from "./context/AuthState.tsx";

import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary 
		fallback={<h1 className="text-medium m-auto text-2xl font-semibold">Unexpected Error: Check Console</h1>}
		onError={(error, info)=>{
			console.log("ERROR: ", error, info);
		}}>
			<AuthState>
				<TourState>
					<BrowserRouter>
						<ThemeProvider>
							<App />
						</ThemeProvider>
					</BrowserRouter>
				</TourState>
			</AuthState>
		</ErrorBoundary>
	</StrictMode>
);