import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { getAllReviews, createReview, updateReview, deleteReview } from "../controllers/reviewController.js";

// The mergeParams option gets the parameters of the parent route in the subrouter
// req.params.tourId is accessible by the route handlers below
const reviewRouter = Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/", restrictTo("user"), createReview);
reviewRouter.patch("/:id", restrictTo("user", "admin"), updateReview);
reviewRouter.delete("/:id", restrictTo("user", "admin"), deleteReview);

export default reviewRouter;