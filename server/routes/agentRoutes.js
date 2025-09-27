import express from "express";
import { protect } from "../middleware/auth.js";
import { addAgent, getAgents } from "../controllers/agentController.js";

const router = express.Router();
router.post("/", protect, addAgent);
router.get("/", protect, getAgents);

export default router;