import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { createBooking, deleteBooking, getAllBookings, getBooking, getCheckoutSession, updateBooking } from "../controllers/bookingController.js";

const router = Router();

// Route for a client booking a tour
router.use(protect);
router.get("/checkout-session/:tourId", getCheckoutSession);

// Admin Commands to handle Bookings
router.use(restrictTo("admin", "lead-guide"));
router.get("/", getAllBookings);
router.post("/", createBooking);
router.get("/:id", getBooking);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking);
export default router;