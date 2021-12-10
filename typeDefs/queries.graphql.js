import { gql } from "apollo-server-micro";

export const Queries = gql`
  type Query {
    login(email: String!, password: String!): DetailsResponseUser
    getUserBlogs(username: String!): UserBlogs
    getBlogByTitle(title: String!): BlogMainTitleSearchResponse
    allBlogs(title: String): BlogSearchFilterResponse
    commentsByBlogId(
      blogId: String!
      sliceStart: Int!
      slice: Int!
    ): DetailsResponseComments
  }

  type BlogMainTitleSearchResponse {
    success: Boolean!
    blog: Blog
  }

  type BlogSearchFilterResponse {
    success: Boolean!
    blogs: [Blog]!
  }

  type UserBlogs {
    success: Boolean!
    blogs: [Blog]!
  }
`;
