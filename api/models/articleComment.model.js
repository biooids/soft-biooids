import mongoose from "mongoose";
const { Schema } = mongoose;

const articleCommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ArticleComment = mongoose.model("ArticleComment", articleCommentSchema);

export default ArticleComment;
