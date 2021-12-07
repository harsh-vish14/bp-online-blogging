import React from "react";
import classes from "./footer.module.scss";
import { AiOutlineCopyrightCircle } from "react-icons/ai/index";
export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <AiOutlineCopyrightCircle /> Copyright is reserved by{" "}
      <a
        href="https://www.linkedin.com/in/harsh-vish14/"
        target="blank"
        style={{ color: "white" }}
      >
        Harshkumar Vishwakarma
      </a>
    </footer>
  );
};
