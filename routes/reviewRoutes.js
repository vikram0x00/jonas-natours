import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { getAllReviews, createReview } from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/:id", protect, restrictTo("user"), createReview);

export default reviewRouter;