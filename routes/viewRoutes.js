import { Router } from "express";
import { getOverview, getTour, getLoginForm, getMe } from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

const viewRouter = Router();

viewRouter.use(isLoggedIn);

viewRouter.get("/", getOverview);
viewRouter.get("/tour/:slug", getTour);
viewRouter.get("/login", getLoginForm);
viewRouter.get("/me", protect, getMe);

export default viewRouter;