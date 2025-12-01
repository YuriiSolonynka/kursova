import Trainer from "../models/Trainer.js";

class TrainerRepository {
  async getAll() {
    return Trainer.find();
  }
}

export default new TrainerRepository();
