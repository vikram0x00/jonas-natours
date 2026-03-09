import { Router } from "express";
import { checkId, checkBody, getAllTours, getTour, createTour, updateTour, deleteTour } from "../controllers/tourController.js";

const tourRouter = Router();

// Format: routerInstance.param("paramName", (req, res, nextFn, valueOfParam)=> ... );

tourRouter.param("id", checkId);

tourRouter.get("/", getAllTours);
tourRouter.get("/:id", getTour);
tourRouter.post("/", checkBody, createTour);
tourRouter.patch("/:id", updateTour);
tourRouter.delete("/:id", deleteTour);

export default tourRouter;