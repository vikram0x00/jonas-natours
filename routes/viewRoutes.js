import { Router } from "express";
import { getOverview, getTour } from "../controllers/viewController.js";

const viewRouter = Router();

viewRouter.get("/", getOverview);

viewRouter.get("/tour/:slug", getTour);

export default viewRouter;