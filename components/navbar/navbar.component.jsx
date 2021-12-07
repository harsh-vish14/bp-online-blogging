import Link from "next/link";
import React from "react";
import classes from "./navbar.module.scss";
import { useSession } from "next-auth/client";
import { Button } from "antd";

export const Navbar = () => {
  const [session, loading] = useSession();
  return (
    <div className={classes.navbar}>
      <nav>
        <Link href="/">
          <a>
            <div className={classes.logo}>PB</div>
          </a>
        </Link>
      </nav>
      <nav className={classes.nav}>
        <Link href="/">Home</Link>
        {loading || !session ? (
          <Link href="/account/login">
            <a>
              <Button type="primary">Sign In/Login In</Button>
            </a>
          </Link>
        ) : (
          <div>WOW you have login</div>
        )}
      </nav>
    </div>
  );
};
