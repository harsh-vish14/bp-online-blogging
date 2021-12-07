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
      password: String
    ): DetailsResponseUser

    addBlog(
      creator: ID!
      coverPhoto: String!
      private: Boolean
      title: String!
      content: String!
    ): DetailsResponseBlog

    updateBlog(
      id: ID!
      coverPhoto: String!
      private: Boolean
      title: String!
      content: String!
    ): DetailsResponseBlog

    deleteBlog(id: ID!): MessageResponse
  }
`;
