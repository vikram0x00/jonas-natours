import { Router } from "express";
import { checkId, checkBody, getTourStats, aliasTopTours, getAllTours, getTour, createTour, updateTour, deleteTour, getMonthlyPlan } from "../controllers/tourController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import reviewRouter from "./reviewRoutes.js";

const tourRouter = Router();

// Format: routerInstance.param("paramName", (req, res, nextFn, valueOfParam)=> ... );

tourRouter.param("id", checkId);

// Mounting a Router inside a router
// Nested Routes
// tourRouter.post("/:id/reviews", protect, restrictTo("user"), createReview);

tourRouter.use("/:id/reviews", reviewRouter);

tourRouter.get("/", protect, getAllTours);
tourRouter.get("/top-5-tours", aliasTopTours);
tourRouter.get("/tour-stats", getTourStats);
tourRouter.get("/monthly-plan/:year", getMonthlyPlan);
tourRouter.get("/:id", getTour);
tourRouter.post("/", checkBody, createTour);
tourRouter.patch("/:id", checkBody, updateTour);
tourRouter.delete("/:id", protect, restrictTo("admin"), deleteTour);

export default tourRouter;