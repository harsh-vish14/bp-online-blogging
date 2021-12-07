import React from "react";
import { Input, Button } from "antd";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import classes from "./account.module.scss";
import Link from "next/link";

export const Login = () => {
  return (
    <div className={classes.form}>
      <div className={classes.formTitle}>login</div>
      <div className={classes.formItems}>
        <Input placeholder="Email" size="large" />
        <Input.Password
          size="large"
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
          }
        />
        <Button type="primary" block>
          Login
        </Button>
        <div className={classes.otherBtn}>
          <div>Forget Password ?</div>
          <div>
            <Link href="/account/register">New Here ? Registration</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
