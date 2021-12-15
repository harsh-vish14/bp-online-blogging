import { gql } from "apollo-server-micro";

export const Blog = gql`
  type Blog {
    "blog unique identifier"
    id: ID!

    "created user id"
    creator: User!

    "is creator is setting the blog to private"
    isPrivate: Boolean!

    "title of the blog"
    title: String!

    "link to the blog"
    likes: Int!

    "content of the blog"
    content: String!

    "Cover photo of the blog"
    coverPhoto: String!

    "createdAt blog date and time"
    createdAt: String!

    "updatedAt blog date and time"
    updatedAt: String!
  }

  type Comment {
    "comment unique identifier"
    id: ID!

    "commented user id"
    commentedBy: User!

    "message added in comment"
    message: String!

    "comment createdAt"
    createdAt: String!

    "comment updatedAt"
    updatedAt: String!
  }
`;
