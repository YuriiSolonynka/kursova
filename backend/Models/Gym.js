import mongoose from "mongoose";

const GymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  services: { type: String, default: "[]" },
  city: { type: String },
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

const Gym = mongoose.model("Gym", GymSchema);

export default Gym;
