import gymRepository from '../repositories/gymRepository.js';

class GymService {
  async getAll() {
    return gymRepository.getAll();
  }
}

export default new GymService();
