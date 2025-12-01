import bookingRepository from "../repositories/bookingRepository.js";
import eventManager from "../observer/eventManager.js";

class BookingService {
    async bookSection({ userId, sectionId, date, time }) {
        const booking = await bookingRepository.createBooking({ userId, sectionId, date, time });

        eventManager.notify('booking:created', booking);

        return { booking };
    };

    async getUserBookings(userId) {
        return await bookingRepository.findBookingsByUser(userId);
    };

    async cancelUserBooking(bookingId, userId) {
        const booking = await bookingRepository.findBookingByIdAndUser(bookingId, userId);
        if (!booking) throw new Error("Booking not found");

        const canceledBooking = await bookingRepository.cancelBooking(booking);

        eventManager.notify('booking:canceled', canceledBooking);

        return canceledBooking;
    };
}

export default new BookingService();