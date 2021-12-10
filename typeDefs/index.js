import { gql } from "apollo-server-micro";
import { Queries } from "./queries.graphql";
import { Mutations } from "./mutations.graphql";
import { User } from "./types/user.graphql";
import { Blog } from "./types/blog.graphql";

export const typeDefs = gql`
  ${User}

  ${Blog}

  ${Queries}

  ${Mutations}

  type MessageResponse {
    success: Boolean!
    message: String
  }

  type DetailsResponseUser {
    success: Boolean!
    message: String
    user: User
  }

  type DetailsResponseBlog {
    success: Boolean!
    message: String
    blog: Blog
  }

  type DetailsResponseComments {
    success: Boolean!
    message: String
    comments: [Comment]
  }
`;
