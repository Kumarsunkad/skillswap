import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendRequest, getRequests, respondRequest } from "../controllers/requestController.js";
import { getConnections } from "../controllers/requestController.js";




const router = express.Router();

router.post("/send", protect, sendRequest);        // Send request
router.get("/received", protect, getRequests);     // Get pending requests
router.put("/respond", protect, respondRequest);   // Accept/Reject
router.get("/connections", protect, getConnections);

export default router;
