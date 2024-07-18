import Update from "../models/update.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new update
export const createUpdate = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newUpdate = new Update({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedUpdate = await newUpdate.save();
    res.status(201).json(savedUpdate);
  } catch (error) {
    next(error);
  }
};

export const getUpdates = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filters = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.updateId && { _id: req.query.updateId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const updates = await Update.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });

    const totalUpdate = await Update.countDocuments(filters);

    res.status(200).json({
      updates,
      totalUpdate,
    });
  } catch (error) {
    console.error("Error in getUpdates:", error);
    next(error);
  }
};

// Get a single update by slug
export const getUpdateBySlug = async (req, res, next) => {
  try {
    const { slug } = req.query;
    const update = await Update.findOne({ slug });
    if (!update) {
      return res.status(404).json({ message: "Update not found" });
    }
    res.status(200).json({ update });
  } catch (error) {
    next(error);
  }
};

// Delete an update by ID
export const deleteUpdate = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You do not have permission to delete the update")
      );
    }

    await Update.findByIdAndDelete(req.params.updateId);
    res.status(200).json("Update has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update an update by ID
export const updateUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    console.log("Unauthorized user");
    return next(
      errorHandler(
        401,
        "You do not have permission to edit or update this update"
      )
    );
  }

  try {
    const updatedUpdate = await Update.findByIdAndUpdate(
      req.params.updateId,
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
    res.status(200).json(updatedUpdate);
  } catch (error) {
    console.log("Error updating update:", error);
    next(error);
  }
};
