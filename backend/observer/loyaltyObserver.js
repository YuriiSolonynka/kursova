import eventManager from "./eventManager.js";
import bookingRepository from "../repositories/bookingRepository.js";

export const POINTS_EARNED = 10;

export const LoyaltyObserver = {
    POINTS_EARNED,
};

const earnPointsOnBooking = async (booking) => {
    if (booking.status !== 'confirmed') {
        return;
    }

    console.log(`[LoyaltyObserver] Processing points for booking ${booking._id}`);

    await bookingRepository.createBonusTransaction({
        userId: booking.user,
        bookingId: booking._id,
        points: POINTS_EARNED
    });

    console.log(`[LoyaltyObserver] Successfully earned ${POINTS_EARNED} points for user ${booking.user}`);
};

eventManager.subscribe('booking:created', earnPointsOnBooking);

const refundPointsOnCancel = async (booking) => {
    console.log(`[LoyaltyObserver] Processing point refund/deduction for canceled booking ${booking._id}`);

    const pointsToDeduct = -POINTS_EARNED;

    await bookingRepository.createBonusTransaction({
        userId: booking.user,
        bookingId: booking._id,
        points: pointsToDeduct
    });

    console.log(`[LoyaltyObserver] Deducted ${-pointsToDeduct} points for user ${booking.user}`);
}

eventManager.subscribe('booking:canceled', refundPointsOnCancel);