import { Router } from "express";
import { getDistances, getToursWithin, checkId, checkBody, getTourStats, aliasTopTours, getAllTours, getTour, createTour, updateTour, deleteTour, getMonthlyPlan, uploadTourImages, resizeTourImages } from "../controllers/tourController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import reviewRouter from "./reviewRoutes.js";

const tourRouter = Router();

// Format: routerInstance.param("paramName", (req, res, nextFn, valueOfParam)=> ... );

tourRouter.param("id", checkId);

// Mounting a Router inside a router
// Nested Routes
// tourRouter.post("/:id/reviews", protect, restrictTo("user"), createReview);

tourRouter.use("/:id/reviews", reviewRouter);

// Geospatial Queries
tourRouter.get("/tours-within/:distance/center/:latlng/unit/:unit", getToursWithin);
tourRouter.get("/distances/:latlng/unit/:unit", getDistances);

tourRouter.get("/", protect, getAllTours);
tourRouter.get("/top-5-tours", aliasTopTours);
tourRouter.get("/tour-stats", getTourStats);
tourRouter.get("/monthly-plan/:year", protect, restrictTo("admin", "lead-guide"), getMonthlyPlan);
tourRouter.get("/:id", getTour);
tourRouter.post("/", checkBody, protect, restrictTo("admin", "lead-guide"), createTour);
tourRouter.patch("/:id", checkBody, protect, restrictTo("admin", "lead-guide"), uploadTourImages, resizeTourImages, updateTour);
tourRouter.delete("/:id", protect, restrictTo("admin"), deleteTour);

export default tourRouter;