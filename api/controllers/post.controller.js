import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new post
export const create = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(
        errorHandler(403, "You do not have permission to create a post")
      );
    }

    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
      mainPost: req.body.mainPost || false,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Get posts with optional filters
// Get posts with optional filters
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const searchTerm = req.query.searchTerm
      ? decodeURIComponent(req.query.searchTerm).replace(/\+/g, " ")
      : null;

    const filters = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(searchTerm && {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { content: { $regex: searchTerm, $options: "i" } },
        ],
      }),
    };

    const posts = await Post.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });

    const totalPost = await Post.countDocuments(filters);
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPost,
      lastMonthPosts,
    });
  } catch (error) {
    console.error("Error in getposts:", error);
    next(error);
  }
};

// Delete a post by ID
export const deletepost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You do not have permission to delete the post")
      );
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update a post by ID
export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(
        401,
        "You do not have permission to edit or update this post, reason may be you are not administrator or post is not yours bro :)"
      )
    );
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          externalLink: req.body.externalLink,
          mainPost: req.body.mainPost,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
