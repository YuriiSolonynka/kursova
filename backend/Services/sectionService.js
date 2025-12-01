import sectionRepository from '../repositories/sectionRepository.js';

class SectionService {
  async getAll() {
    return sectionRepository.getAll();
  }

  async getSectionById(id) {
    return await sectionRepository.findById(id);
  }
}

export default new SectionService();
