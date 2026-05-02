import { Router } from "express";
import { getOverview, getTour, getLoginForm, getMe, getBookings } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";
import { createBookingCheckout } from "../controllers/bookingController.js"

const viewRouter = Router();

viewRouter.get("/", createBookingCheckout, isLoggedIn, getOverview);

viewRouter.use(isLoggedIn);
viewRouter.get("/tour/:slug", getTour);
viewRouter.get("/login", getLoginForm);
viewRouter.get("/me", protect, getMe);
viewRouter.get("/my-tours", protect, getBookings);

export default viewRouter;