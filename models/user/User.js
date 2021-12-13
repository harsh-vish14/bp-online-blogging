import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide name"],
      trim: true,
    },
    username: {
      type: String,
      require: [true, "Please provide username"],
    },
    profileImage: {
      type: String,
      default:
        "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    email: {
      type: String,
      require: [true, "Please provide email"],
      trim: true,
    },
    password: {
      type: String,
      require: [true, "Please provide password"],
      trim: true,
    },
    resetToken: {
      token: {
        type: String,
        default: null,
      },
      expire: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

mongoose.models = {};

export const User = mongoose.model("User", UserSchema);
