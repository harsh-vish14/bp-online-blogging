import { gql } from "apollo-server-micro";

export const Mutations = gql`
  type Mutation {
    addUser(
      name: String!
      username: String!
      bio: String!
      profileImage: String
      email: String!
      password: String!
    ): DetailsResponseUser

    updateUser(
      id: ID!
      name: String!
      bio: String!
      profileImage: String
      email: String!
    ): DetailsResponseUser

    addBlog(
      creator: ID!
      coverPhoto: String
      isPrivate: Boolean
      title: String!
      content: String!
    ): DetailsResponseBlog

    updateBlog(
      id: ID!
      coverPhoto: String
      isPrivate: Boolean
      title: String!
      content: String!
    ): DetailsResponseBlog

    addCommentToBlog(
      blogId: String!
      message: String!
      userId: String!
    ): DetailsResponseComments

    resetPassword(id: ID): MessageResponse

    deleteComment(commentId: String!): MessageResponse

    deleteBlog(id: ID!): MessageResponse
  }
`;
