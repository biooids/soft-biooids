import Ad from "../models/ad.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new Ad
export const createAd = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newAd = new Ad({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (error) {
    next(error);
  }
};

export const getAds = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filters = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.adId && { _id: req.query.adId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const ads = await Ad.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "userId",
        select: "username profilePicture",
      });

    const totalAd = await Ad.countDocuments(filters);

    res.status(200).json({
      ads,
      totalAd,
    });
  } catch (error) {
    console.error("Error in getAds:", error);
    next(error);
  }
};

export const getAdBySlug = async (req, res, next) => {
  try {
    const { slug } = req.query;
    const ad = await Ad.findOne({ slug });
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    res.status(200).json({ ad });
  } catch (error) {
    next(error);
  }
};

export const deleteAd = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You do not have permission to delete the ad")
      );
    }

    await Ad.findByIdAndDelete(req.params.adId);
    res.status(200).json("Ad has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateAd = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    console.log("Unauthorized user");
    return next(
      errorHandler(401, "You do not have permission to edit or ad this ad")
    );
  }

  try {
    const updatedAd = await Ad.findByIdAndAd(
      req.params.adId,
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
    res.status(200).json(updatedAd);
  } catch (error) {
    console.log("Error updating ad:", error);
    next(error);
  }
};
