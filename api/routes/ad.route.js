import express from "express";
import {
  createAd,
  deleteAd,
  getAdBySlug,
  getAds,
  updateAd,
} from "../controllers/ad.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createAd", verifyToken, createAd);
router.get("/getAds", getAds);
router.get("/getAd", getAdBySlug);
router.delete("/deleteAd/:adId/:userId", verifyToken, deleteAd);
router.put("/updateAd/:adId/:userId", verifyToken, updateAd);

export default router;
