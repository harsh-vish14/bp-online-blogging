import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogByTitle,
  allBlogs,
  commentsByBlogId,
  addCommentToBlog,
  deleteComment,
} from "./blog/blog";
import {
  createUser,
  updateUser,
  loginUser,
  getUserBlogs,
  resetPassword,
} from "./user/user";

export const resolvers = {
  Query: {
    login: loginUser,
    getUserBlogs,
    getBlogByTitle,
    allBlogs,
    commentsByBlogId,
  },

  Mutation: {
    addUser: createUser,
    updateUser,
    addBlog: createBlog,
    updateBlog,
    deleteBlog,
    addCommentToBlog,
    deleteComment,
    resetPassword,
  },
};
