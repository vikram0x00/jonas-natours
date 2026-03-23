import express from "express";
import { styleText } from "util";
import userRouter from "./routes/userRoutes.js";
import tourRouter from "./routes/tourRoutes.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import AppError from "./appError.js";
import { errorHandler } from "./controllers/errorController.js";

// import morgan from "morgan";

config();

const DB_URL = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB_URL).then(()=>{
	console.log("Connected To Database");
});

const app = express();
const port = 3000;

// Custom Logger middleware
app.use((req, res, next)=>{
	console.log(styleText(["bgBlue", "white"], " HTTP "), "New Request", styleText("yellow", req.method.toUpperCase()), req.url);
	// If we dont call the next function, function and the execution
	// All the functionality is halted
	next();
});

// Serve Static Files from a root folder
// If no Route Specified, It will Serve at the Root Route i.e /
// app.use(express.static(`./public`));
// We will specify a Route by
app.use("/public", express.static(`./public`));

// For Extended Request Query parsing
app.set("query parser", "extended");

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

/**
 * The Old Express Method app.all with * does not work anymore
 * Because Express moved on to a stricter version of path-to-regexp
 * This has to be placed in the last because the order of the routes defined 
 * is the order they are processed in and checked for
 * This is the last function and it is understood that there are no other routes which match the requested URL
 * Send out a Status 404 and a failed message
 */
app.use((req, res, next)=>{
	next(new AppError(`Can't find https://${req.hostname}:3000${req.url} on this Server`, 404));
});

// Central Error Handler Middleware
/**
 * Takes Params Error, req, res, next
 * In any route or middleware, (handler) calling next() and supplying the error object to it 
 * The Error object ends up in this Central error handler function which we can handle and send some response back to the client
 */
app.use(errorHandler);

app.listen(port, ()=>{
	console.log("Natours running on port http://localhost:3000/");
});