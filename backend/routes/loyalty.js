import express from "express";
import protect from "../middleware/auth.js";
import { getLoyaltyData } from '../controllers/userController.js';

const router = express.Router();

router.get("/", protect, getLoyaltyData);

export default router;
