import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipPlan", required: true },
    price: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired", "canceled"], default: "active" },
    accessibleSections: { type: String, default: "" }
});

const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;
