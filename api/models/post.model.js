import mongoose from "mongoose";

const postShema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_640.jpg",
      required: true,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    externalLink: {
      type: String,
      default: "", // You can set a default value or remove this line if not needed
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postShema);

export default Post;
