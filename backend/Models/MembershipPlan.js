import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: String, default: "[]" },
    highlighted: { type: Boolean, default: false },
    durationDays: { type: Number, required: true },
}, { timestamps: true });

const MembershipPlan = mongoose.model("MembershipPlan", membershipPlanSchema);

export default MembershipPlan;
