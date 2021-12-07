import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide creator id"],
    },
    private: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      require: [true, "Please provide a blog title"],
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      require: [true, "Please provide a blog content"],
    },
    coverPhoto: {
      type: String,
      require: [true, "Please provide a cover photo"],
    },
    comments: [
      new mongoose.Schema(
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
        },
        { timestamps: true }
      ),
    ],
  },
  { timestamps: true }
);
mongoose.models = {};

export const Blog = mongoose.model("Blog", BlogSchema);
