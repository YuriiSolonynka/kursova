import trainerRepository from '../repositories/trainerRepository.js';

class TrainerService {
  async getAll() {
    return trainerRepository.getAll();
  }
}

export default new TrainerService();
