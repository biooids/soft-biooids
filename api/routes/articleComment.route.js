import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createArticleComment,
  deleteArticleComment,
  editArticleComment,
  getArticleComments,
  getAllArticleComments,
  likeArticleComment,
} from "../controllers/articleComment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createArticleComment);
router.get("/getArticleComments/:articleId", getArticleComments);
router.put("/likeArticleComment/:commentId", verifyToken, likeArticleComment);
router.put("/editArticleComment/:commentId", verifyToken, editArticleComment);
router.delete(
  "/deleteArticleComment/:commentId",
  verifyToken,
  deleteArticleComment
);
router.get("/getAllArticleComments", verifyToken, getAllArticleComments);

export default router;
