import express from 'express';
import { getAllGyms } from '../controllers/gymController.js';

const router = express.Router();

router.get('/', getAllGyms);

export default router;
