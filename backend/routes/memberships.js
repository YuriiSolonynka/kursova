import express from "express";
import protect from "../middleware/auth.js";
import { getPlans, getMyMemberships, buy, cancel } from "../controllers/membershipController.js";

const router = express.Router();

router.get("/plans", getPlans);
router.get("/my", protect, getMyMemberships);
router.post("/buy", protect, buy);
router.delete("/:id", protect, cancel);

export default router;
