import React, { Fragment } from "react";
import Head from "next/head";
import { Footer } from "../footer/footer.component";
import { Navbar } from "../navbar/navbar.component";

export const Layout = (props) => {
  return (
    <Fragment>
      <Head>
        <title>BP Online Blogging</title>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="Alumina connect for Our college students of TCET"
        ></meta>
      </Head>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
