import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addToFavorites, getFavorites, removeFromFavorites } from '../controllers/favoriteController.js';


const router = express.Router();

router.use(protect);
router.post("/", addToFavorites);
router.get("/", getFavorites);
router.delete("/", protect, removeFromFavorites);

export default router;