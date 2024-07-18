import Research from "../models/research.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new research
export const createResearch = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newResearch = new Research({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedResearch = await newResearch.save();
    res.status(201).json(savedResearch);
  } catch (error) {
    next(error);
  }
};

export const getResearches = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filters = {
      ...(req.query.userId && { userId: req.query.userId }), // Filter by userId if provided
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.researchId && { _id: req.query.researchId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const researches = await Research.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });

    const totalResearch = await Research.countDocuments(filters);

    res.status(200).json({
      researches,
      totalResearch,
    });
  } catch (error) {
    console.error("Error in getResearches:", error);
    next(error);
  }
};

// Get a single research by slug
export const getResearchBySlug = async (req, res, next) => {
  try {
    const { slug } = req.query;
    const research = await Research.findOne({ slug });
    if (!research) {
      return res.status(404).json({ message: "Research not found" });
    }
    res.status(200).json({ research });
  } catch (error) {
    next(error);
  }
};

// Delete a research by ID
export const deleteResearch = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You do not have permission to delete the research")
      );
    }

    await Research.findByIdAndDelete(req.params.researchId);
    res.status(200).json("Research has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update a research by ID
export const updateResearch = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    console.log("Unauthorized user");
    return next(
      errorHandler(
        401,
        "You do not have permission to edit or update this research"
      )
    );
  }

  try {
    const updatedResearch = await Research.findByIdAndUpdate(
      req.params.researchId,
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
    res.status(200).json(updatedResearch);
  } catch (error) {
    console.log("Error updating research:", error);
    next(error);
  }
};
