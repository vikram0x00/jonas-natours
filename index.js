import express from "express";
import { styleText } from "util";
import userRouter from "./routes/userRoutes.js";
import tourRouter from "./routes/tourRoutes.js";

// import morgan from "morgan";

const app = express();
const port = 3000;

// Custom Logger middleware
app.use((req, res, next)=>{
	console.log(styleText(["bgBlue", "white"], " HTTP "), "New Request", req.url, Date.now());
	// If we dont call the next function, function and the execution
	// All the functionality is halted
	next();
});

// External package for logging
// app.use(morgan("dev"));

// Enables to use Json in Express App
app.use(express.json());

// Router Middleware
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Refactored Routes

// Format: app.httpmethod("routeDefn", ...fns: middleware, finalfn);

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

// Shorthand Method for handling routes
// Chain multiple HTTP methods into single line
// app.route("/api/v1/tours/").get(getAllTours).post(createTour);
// app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

app.listen(port, ()=>{
	console.log("Natours running on port http://localhost:3000/");
});