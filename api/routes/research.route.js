import express from "express";
import {
  createResearch,
  getResearches,
  getResearchBySlug,
  deleteResearch,
  updateResearch,
} from "../controllers/research.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createResearch);
router.get("/getResearches", getResearches);
router.get("/getResearch", getResearchBySlug);
router.delete(
  "/deleteResearch/:researchId/:userId",
  verifyToken,
  deleteResearch
);
router.put("/updateResearch/:researchId/:userId", verifyToken, updateResearch);

export default router;
