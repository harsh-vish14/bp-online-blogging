import { ApolloError } from "apollo-server-errors";

export class ErrorResponse extends ApolloError {
  constructor(message, code) {
    super(message, code);
    Object.defineProperty(this, "name", { value: "ErrorResponse" });
  }
}
