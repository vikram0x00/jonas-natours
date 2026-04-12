import { Router } from "express";
import { getOverview, getTour } from "../controllers/viewController.js";

const viewRouter = Router();

viewRouter.get("/", getOverview);

viewRouter.get("/tour", (req, res)=>{
	res.status(200).render("tour", {
		title: "The Sea Explorer"
	});
});

export default viewRouter;