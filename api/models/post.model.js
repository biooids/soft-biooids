import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      default: "",
    },
    mainPost: {
      type: Boolean,
      default: false,
    },
    topPost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
