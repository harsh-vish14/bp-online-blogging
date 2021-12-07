import { Blog } from "../../models/blogs/Blog";
import { User } from "../../models/user/User";
import { ErrorResponse } from "../../utils/ErrorResponse";

export const createBlog = async (
  _,
  { creator, title, content, coverPhoto }
) => {
  try {
    const creatorValidation = await User.findOne({ _id: creator });
    if (!creatorValidation) {
      throw new ErrorResponse("Creator not found", 404);
    }

    const titleValidation = await Blog.findOne({
      title: { $regex: title, $options: "i" },
    });
    if (titleValidation) {
      throw new ErrorResponse(
        "Title is already exists, Please use unique title",
        400
      );
    }

    const blogData = await Blog.create({
      creator,
      // private,
      title,
      content,
      coverPhoto,
    });
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { blogs: blogData._id } }
    );
    const blogPopulateData = await Blog.findOne({ _id: blogData._id }).populate(
      "creator"
    );
    return {
      success: true,
      message: "Blog created successfully",
      blog: blogPopulateData,
    };
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export const updateBlog = async (_, { id, title, content, coverPhoto }) => {
  try {
    const blogValidation = await Blog.findOne({ _id: id });
    if (!blogValidation) {
      throw new ErrorResponse("blog not found", 404);
    }

    await Blog.findOneAndUpdate({ _id: id }, { title, content, coverPhoto });

    const blogPopulateData = await Blog.findOne({
      _id: blogValidation._id,
    }).populate("creator");
    return {
      success: true,
      message: "Blog updated successfully",
      blog: blogPopulateData,
    };
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export const deleteBlog = async (_, { id }) => {
  try {
    const blogValidation = await Blog.findOne({ _id: id });
    if (!blogValidation) {
      throw new ErrorResponse("Blog not found", 404);
    }
    await Blog.deleteOne({ _id: id });
    await User.findOneAndUpdate(
      { _id: blogValidation.creator },
      { $pull: { blogs: id } }
    );
    return {
      success: true,
      message: "Blog deleted successfully",
    };
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export const getBlogByTitle = async (_, { title }) => {
  try {
    if (!title) {
      throw new ErrorResponse("Blog not found", 404);
    }
    const normalTitle = title.split("-").join(" ");
    const blogData = await Blog.findOne({
      title: { $regex: normalTitle, $options: "i" },
    }).populate("creator");
    if (blogData) {
      return {
        success: true,
        blog: blogData,
      };
    } else {
      throw new ErrorResponse("Blog not found", 404);
    }
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export const allBlogs = async (_, { title }) => {
  const search = {};
  if (title) {
    search.title = { $regex: title, $options: "i" };
  }
  const blogs = await Blog.find(search).populate("creator");
  return {
    success: true,
    blogs,
  };
};

// exports = { createBlog, updateBlog, deleteBlog, getBlogByTitle, allBlogs };
