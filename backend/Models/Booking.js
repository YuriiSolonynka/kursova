import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["confirmed", "canceled"], default: "confirmed" }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
