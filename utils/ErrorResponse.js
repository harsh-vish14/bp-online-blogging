const { ApolloError } = require("apollo-server-errors");

class ErrorResponse extends ApolloError {
  constructor(message, code) {
    super(message, code);
    Object.defineProperty(this, "name", { value: "ErrorResponse" });
  }
}

module.exports = { ErrorResponse };
