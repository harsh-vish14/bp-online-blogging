import React from "react";
import "antd/dist/antd.css";
import "../styles/globals.scss";
import { Layout } from "../components/layout/layout";
import { Provider } from "next-auth/client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

cache.writeData({
  data: {},
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ApolloProvider client={client}>
      <Provider
        options={{
          clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
        }}
        session={pageProps.session}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
