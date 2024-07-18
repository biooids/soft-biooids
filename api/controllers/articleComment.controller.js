import ArticleComment from "../models/articleComment.model.js";
import { errorHandler } from "../utils/error.js";

export const createArticleComment = async (req, res, next) => {
  try {
    const { content, articleId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new ArticleComment({
      content,
      articleId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getArticleComments = async (req, res, next) => {
  try {
    const comments = await ArticleComment.find({
      articleId: req.params.articleId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeArticleComment = async (req, res, next) => {
  try {
    const comment = await ArticleComment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editArticleComment = async (req, res, next) => {
  try {
    const comment = await ArticleComment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await ArticleComment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteArticleComment = async (req, res, next) => {
  try {
    const comment = await ArticleComment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    await ArticleComment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getAllArticleComments = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await ArticleComment.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await ArticleComment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await ArticleComment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};
