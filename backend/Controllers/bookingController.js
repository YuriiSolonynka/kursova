import BookingService from "../services/bookingService.js";
import { LoyaltyObserver } from "../observer/loyaltyObserver.js";

export const createBooking = async (req, res) => {
    try {
        const { sectionId, date, time } = req.body;

        const result = await BookingService.bookSection({ userId: req.user.id, sectionId, date, time });

        const earnedPoints = LoyaltyObserver.POINTS_EARNED;

        res.json({ ...result.booking.toObject(), earnedPoints });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(400).json({ error: err.message || "Booking failed" });
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await BookingService.getUserBookings(req.user.id);
        res.json(bookings);
    } catch (err) {
        console.error("Fetch bookings error:", err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await BookingService.cancelUserBooking(req.params.id, req.user.id);
        res.json({ message: "Booking canceled", booking });
    } catch (err) {
        console.error("Cancel booking error:", err);
        res.status(404).json({ error: err.message });
    }
};