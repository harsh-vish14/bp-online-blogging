import { gql } from "apollo-server-micro";
import { Query } from "./query";

export const typeDefs = gql`
  ${Query}
  type User {
    name: String
  }
`;
