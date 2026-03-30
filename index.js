import express from "express";
import { styleText } from "util";
import userRouter from "./routes/userRoutes.js";
import tourRouter from "./routes/tourRoutes.js";
import { config } from "dotenv";
import mongoose from "mongoose";
import AppError from "./utils/appError.js";
import { errorHandler } from "./controllers/errorController.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

// import sanitize from "express-mongo-sanitize";
// import xss from "xss";
// import morgan from "morgan";

config();

const DB_URL = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB_URL).then(()=>{
	console.log("Connected To Database");
});

// Handle all Synchronous Code Errors
// This function needs to be at the top of the code
// Put it above the app declaration to handle all the sync code errors
process.on("uncaughtException", (error)=>{
	console.log("Uncaught Exception: ", error.name, error.message, error.stack);
	console.log("Shutting down the server...");
	process.exit(1);
});

// Use it according to requirements of your application and do not use it blindly
const limiter = rateLimit({
	max: 100,
	windowMs: 60*60*1000,
	message: "ERROR 429: Rate Limit Exceeded for the IP Address. Wait an hour before you request this route again"
});

const app = express();
const port = 3000;

// Set Security Headers automatically with Helmet Middleware
// Use it just above the middleware stack so that it sets the headers properly
app.use(helmet());

// Prevent XSS Attacks and Convert HTML to Entities in Input Fields
// app.use(xss);

// Prevent Parameter pollution
// Express evaluates multiple values for the same query as an array and req.query.field = [...values]
app.use(hpp({
	whitelist: [
		"duration",
		"ratingsQuantity",
		"ratingsAverage",
		"maxGroupSize",
		"difficulty",
		"price"
	]
}));

// Prevent NoSQL Query Injections for MongoDB
// app.use(sanitize());

// Rate Limiting Plugin for API routes only, not for the overall website
app.use("/api", limiter);

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
// We can specify some options in the object such as limit 
// This understands conventional number:unit string
app.use(express.json({ limit: "10kb" }));

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

// This function returns a Server object
const server = app.listen(port, ()=>{
	console.log("Natours running on port http://localhost:3000/");
});

// Handle All Unhandled Promise Rejections
// This is an Project Central way of handling any unhandled / uncaught promise
// which throws an error and the Process exits

process.on("unhandledRejection", (error)=>{
	console.log("Unhandled Rejection:", error.name, error.message);
	console.log("Shutting down the server...");
	// This function waits until all the current requests are processed
	// and then kills the node process
	server.close(()=>{
		process.exit(1);
	});
});