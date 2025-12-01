import sectionService from "../services/sectionService.js";
import appService from "../services/facade.js";

export const getAllSection = async (req, res) => {
  try {
    const sections = await appService.getAllSections();
    res.json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ message: "Server error occurred while fetching sections" });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await sectionService.getSectionById(id);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    console.error("Error fetching section:", error);
    res.status(500).json({ message: "Server error" });
  }
}