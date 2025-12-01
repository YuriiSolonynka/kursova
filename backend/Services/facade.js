import GymService from './gymService.js';
import SectionService from './sectionService.js';
import TrainerService from './trainerService.js';

class AppServiceFacade {
    constructor() {
        this.gymService = GymService;
        this.sectionService = SectionService;
        this.trainerService = TrainerService;
    }

    async getAllGyms() {
        return this.gymService.getAll();
    }

    async getAllSections() {
        console.log("Facade: Getting all sections...");
        return this.sectionService.getAll();
    }

    async getAllTrainers() {
        console.log("Facade: Getting all trainers...");
        return this.trainerService.getAll();
    }


    async getFullAppData() {
        const [gyms, sections, trainers] = await Promise.all([
            this.gymService.getAll(),
            this.sectionService.getAll(),
            this.trainerService.getAll(),
        ]);

        return {
            gyms,
            sections,
            trainers,
        };
    }
}

export default new AppServiceFacade();