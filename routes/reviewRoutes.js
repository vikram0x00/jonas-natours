import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { getAllReviews, createReview } from "../controllers/reviewController.js";

// The mergeParams option gets the parameters of the parent route in the subrouter
// req.params.tourId is accessible by the route handlers below
const reviewRouter = Router({ mergeParams: true });

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/", protect, restrictTo("user"), createReview);

export default reviewRouter;