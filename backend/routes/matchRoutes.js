import express from "express";
import { findMatches } from "../controllers/matchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/match/find
router.get("/find", protect, findMatches);

export default router;
