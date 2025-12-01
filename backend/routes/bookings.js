import express from "express";
import protect from "../middleware/auth.js";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);

export default router;
