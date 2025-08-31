import express from "express";
import { updateProfile, getMyProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Update skills
router.put("/update", protect, updateProfile);

// Get my profile
router.get("/me", protect, getMyProfile);

export default router;
