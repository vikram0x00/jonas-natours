import { Router } from "express";
import { checkId, checkBody, aliasTopTours, getAllTours, getTour, createTour, updateTour, deleteTour } from "../controllers/tourController.js";

const tourRouter = Router();

// Format: routerInstance.param("paramName", (req, res, nextFn, valueOfParam)=> ... );

tourRouter.param("id", checkId);

tourRouter.get("/", getAllTours);
tourRouter.get("/top-5-tours", aliasTopTours, getAllTours);
tourRouter.get("/:id", getTour);
tourRouter.post("/", checkBody, createTour);
tourRouter.patch("/:id", checkBody, updateTour);
tourRouter.delete("/:id", deleteTour);

export default tourRouter;