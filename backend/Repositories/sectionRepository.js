
import Section from "../models/Section.js";

class SectionRepository {
  async getAll() {
    const sections = await Section.find().populate('gymId', 'address');

    return sections.map(section => {
      const sectionObj = section.toObject();

      return {
        ...sectionObj,
        schedule: JSON.parse(sectionObj.schedule || "[]"),
      };
    });
  }

  async findById(id) {
    const section = await Section.findById(id).populate('gymId', 'address');

    if (!section) return null;

    const sectionObj = section.toObject();

    return {
      ...sectionObj,
      schedule: JSON.parse(sectionObj.schedule || "[]"),
    };
  }
}

export default new SectionRepository();
