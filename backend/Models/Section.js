import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  sportType: { type: String },
  skillLevel: { type: String },
  ageGroup: { type: String },
  schedule: { type: String, default: "[]" },
  gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true }
}, { timestamps: true });

const Section = mongoose.model("Section", SectionSchema);

export default Section;
