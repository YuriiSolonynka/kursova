import express from 'express';
import { getAllTrainers } from '../controllers/trainerController.js';

const router = express.Router();

router.get('/', getAllTrainers);

export default router;
