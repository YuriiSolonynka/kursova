import express from 'express';
import { getSectionById, getAllSection } from '../controllers/sectionController.js';

const router = express.Router();

router.get("/", getAllSection);
router.get("/:id", getSectionById);

export default router;
