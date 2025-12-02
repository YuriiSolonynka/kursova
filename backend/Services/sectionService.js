import sectionRepository from '../repositories/sectionRepository.js';

class SectionService {
  async getAll() {
    return sectionRepository.getAll();
  }

  async getSectionById(id) {
    return await sectionRepository.findById(id);
  }

  async getSectionsByIds(ids) {
    return await sectionRepository.findByIds(ids);
  }
}

export default new SectionService();
