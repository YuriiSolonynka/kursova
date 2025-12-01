import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  experience: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  avatar: { type: String },
}, { timestamps: true });

const Trainer = mongoose.model("Trainer", TrainerSchema);

export default Trainer;

