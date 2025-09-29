import express from "express";
import { protect } from "../middleware/auth.js";
import { getAssignments } from "../controllers/assignmentController.js";

const router = express.Router();
router.get("/", protect, getAssignments);

export default router;
