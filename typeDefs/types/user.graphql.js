import { gql } from "apollo-server-micro";

export const User = gql`
  type User {
    "user unique mongodb id"
    id: ID!

    "name of user"
    name: String!

    "username of url of user"
    username: String!

    "profile image of url of user"
    profileImage: String!

    "bio of user"
    bio: String!

    "user created blogs"
    blogs: [ID]!

    "email of user"
    email: String!

    "user created is ISO formate with date and time"
    createdAt: String!

    "user last updated is ISO formate with date and time"
    updatedAt: String!
  }
`;
