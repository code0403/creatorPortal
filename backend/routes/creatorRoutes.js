import express from "express";
import {
  getCreators,
  getCreatorById,
  addCreator,
  updateCreator,
  deleteCreator,
} from "../controllers/creatorController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCreators);
router.get("/:id", getCreatorById);
router.post("/", protect, adminOnly, addCreator);
router.put("/:id", protect, adminOnly, updateCreator);
router.delete("/:id", protect, adminOnly, deleteCreator);

export default router;
