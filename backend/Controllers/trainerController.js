import appService from "../services/facade.js";

export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await appService.getAllTrainers();
    res.json(trainers);
  } catch (err) {
    console.error("Error fetching trainers:", err);
    res.status(500).send("Server error occurred while fetching trainers.");
  }
};