// Import Article model
import Article from "../models/article.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new article
export const createArticle = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newArticle = new Article({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    next(error);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filters = {
      ...(req.query.userId && { userId: req.query.userId }), // Filter by userId if provided
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.articleId && { _id: req.query.articleId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const articles = await Article.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });

    const totalArticle = await Article.countDocuments(filters);

    res.status(200).json({
      articles,
      totalArticle,
    });
  } catch (error) {
    console.error("Error in getArticles:", error);
    next(error);
  }
};

// Get a single article by slug
export const getArticleBySlug = async (req, res, next) => {
  try {
    const { slug } = req.query;
    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (error) {
    next(error);
  }
};

// Delete an article by ID
export const deleteArticle = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You do not have permission to delete the article")
      );
    }

    await Article.findByIdAndDelete(req.params.articleId);
    res.status(200).json("Article has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update an article by ID

export const updateArticle = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    console.log("Unauthorized user");
    return next(
      errorHandler(
        401,
        "You do not have permission to edit or update this article"
      )
    );
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          externalLink: req.body.externalLink,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.log("Error updating article:", error);
    next(error);
  }
};
