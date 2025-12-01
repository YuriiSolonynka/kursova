import appService from "../services/facade.js";

export const getAllGyms = async (req, res) => {
  try {
    const gyms = await appService.getAllGyms();
    res.json(gyms);
  } catch (err) {
    console.error("Error fetching gyms:", err);
    res.status(500).send("Server error occurred while fetching gyms.");
  }
};