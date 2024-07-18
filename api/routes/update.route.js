import express from "express";
import {
  createUpdate,
  getUpdates,
  getUpdateBySlug,
  deleteUpdate,
  updateUpdate,
} from "../controllers/update.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createUpdate);
router.get("/getUpdates", getUpdates);
router.get("/getUpdate", getUpdateBySlug);
router.delete("/deleteUpdate/:updateId/:userId", verifyToken, deleteUpdate);
router.put("/updateUpdate/:updateId/:userId", verifyToken, updateUpdate);

export default router;
