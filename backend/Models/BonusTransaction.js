import mongoose from "mongoose";
import User from "./User.js";

const bonusTransactionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
        points: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

bonusTransactionSchema.post("save", async function (doc) {
    try {
        await User.findByIdAndUpdate(
            doc.user,
            { $inc: { bonusPoints: doc.points } },
            { new: true }
        );
    } catch (err) {
        console.error("Error updating user bonusPoints:", err);
    }
});

const BonusTransaction = mongoose.model(
    "BonusTransaction",
    bonusTransactionSchema
);

export default BonusTransaction;
