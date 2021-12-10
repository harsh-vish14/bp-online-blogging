import { Blog } from "../../models/blogs/Blog";
import { User } from "../../models/user/User";
import { ErrorResponse } from "../../utils/ErrorResponse";

export const createBlog = async (
  _,
  { creator, title, content, isPrivate, coverPhoto }
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
      isPrivate,
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
      isPrivate: false,
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
  const search = { isPrivate: false };
  if (title) {
    search.title = { $regex: title, $options: "i" };
  }
  const blogs = await Blog.find(search)
    .limit(limit)
    .skip(startIndex)
    .populate("creator");
  return {
    success: true,
    blogs,
  };
};

// exports = { createBlog, updateBlog, deleteBlog, getBlogByTitle, allBlogs };

export const commentsByBlogId = async (_, { blogId, sliceStart, slice }) => {
  const blog = await Blog.find(
    { _id: blogId },
    { comments: { $slice: [sliceStart, slice] } }
  ).populate("comments.commentedBy");
  console.log(sliceStart, slice);
  if (!blog) {
    throw new ErrorResponse("Blog not found", 404);
  }
  return {
    success: true,
    comments: blog[0].comments,
  };
};

export const addCommentToBlog = async (
  _,
  { blogId, message, userId, slice }
) => {
  if (!message) {
    throw new ErrorResponse("Message cannot be empty", 400);
  }
  const blog = await Blog.findOne({ _id: blogId });
  if (!blog) {
    throw new ErrorResponse("Blog not found", 404);
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  await Blog.findOneAndUpdate(
    { _id: blogId },
    {
      $push: {
        comments: {
          $each: [{ commentedBy: user._id, message }],
          $sort: { updatedAt: -1 },
        },
      },
    }
  );

  const blogComments = await Blog.findOne(
    { _id: blogId },
    { comments: { $slice: [0, slice] } }
  );

  return {
    success: true,
    message: "Comment added successfully",
  };
};

export const deleteComment = async (_, { commentId }) => {
  const commentData = await Blog.findOne({ "comments._id": commentId });
  if (!commentData) {
    throw new ErrorResponse("Comment not found", 404);
  }
  await Blog.updateOne(
    { "comments._id": commentId },
    {
      $pull: {
        comments: {
          _id: commentId,
        },
      },
    }
  );
  return {
    success: true,
    message: "Comment Deleted Successfully",
  };
};
