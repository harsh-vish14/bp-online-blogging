import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: [true, "Please provide creator id"],
    },
    isPrivate: {
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
      default:
        "https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=100",
    },
  },
  { timestamps: true }
);
mongoose.models = {};

export const Blog = mongoose.model("Blog", BlogSchema);
