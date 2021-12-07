import React, { Fragment } from "react";
import { Footer } from "../footer/footer.component";
import { Navbar } from "../navbar/navbar.component";

export const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};
