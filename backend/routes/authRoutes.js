import express from "express";
import { register, login } from "../controllers/authController.js";
import { getRecentLogins } from "../controllers/activityController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/recent-logins", protect, adminOnly, getRecentLogins)

export default router;
