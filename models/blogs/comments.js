import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide a commenter id"],
    },
    message: {
      type: String,
      require: [true, "Please provide a message"],
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      require: [true, "Please provide a blog id"],
    },
  },
  { timestamps: true }
);
mongoose.models = {};

export const Comment = mongoose.model("Comment", CommentSchema);
