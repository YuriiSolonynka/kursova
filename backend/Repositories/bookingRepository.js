
import Booking from "../models/Booking.js";
import BonusTransaction from "../models/BonusTransaction.js";

class BookingRepository {
    async createBooking({ userId, sectionId, date, time }) {
        const booking = await Booking.create({
            user: userId,
            section: sectionId,
            date,
            time,
            status: "confirmed"
        });
        return booking;
    };

    async createBonusTransaction({ userId, bookingId, points }) {
        return await BonusTransaction.create({
            user: userId,
            bookingId,
            points,
        });
    };

    async findBookingsByUser(userId) {
        return await Booking.find({ user: userId }).populate("section");
    };

    async findBookingByIdAndUser(bookingId, userId) {
        return await Booking.findOne({ _id: bookingId, user: userId });
    };

    async cancelBooking(booking) {
        booking.status = "canceled";
        return await booking.save();
    }
}

export default new BookingRepository();