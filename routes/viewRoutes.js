import { Router } from "express";
import { getOverview, getTour, getLoginForm } from "../controllers/viewController.js";
import { isLoggedIn } from "../controllers/authController.js";

const viewRouter = Router();

viewRouter.use(isLoggedIn);

viewRouter.get("/", getOverview);
viewRouter.get("/tour/:slug", getTour);

viewRouter.get("/login", getLoginForm);

export default viewRouter;