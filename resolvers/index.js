import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogByTitle,
  allBlogs,
} from "./blog/blog";
import { createUser, updateUser, loginUser, getUserBlogs } from "./user/user";

export const resolvers = {
  Query: {
    login: loginUser,
    getUserBlogs,
    getBlogByTitle,
    allBlogs,
  },

  Mutation: {
    addUser: createUser,
    updateUser,
    addBlog: createBlog,
    updateBlog,
    deleteBlog,
  },
};
