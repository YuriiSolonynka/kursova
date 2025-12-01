import Gym from "../models/Gym.js";

class GymRepository {
  async getAll() {
    const gyms = await Gym.find();

    return gyms.map(gym => ({
      ...gym.toObject(),
      services: JSON.parse(gym.services || "[]")
    }));
  }
}

export default new GymRepository();
