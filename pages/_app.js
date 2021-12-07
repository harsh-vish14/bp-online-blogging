import React from "react";
import "antd/dist/antd.css";
import "../styles/globals.scss";
import { Layout } from "../components/layout/layout";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
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
  );
}

export default MyApp;
