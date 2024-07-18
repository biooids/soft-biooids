import express from "express";
import {
  createArticle,
  getArticles,
  getArticleBySlug,
  deleteArticle,
  updateArticle,
} from "../controllers/article.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createArticle);
router.get("/getArticles", getArticles);
router.get("/getArticle", getArticleBySlug);
router.delete("/deleteArticle/:articleId/:userId", verifyToken, deleteArticle);
router.put("/updateArticle/:articleId/:userId", verifyToken, updateArticle);

export default router;
