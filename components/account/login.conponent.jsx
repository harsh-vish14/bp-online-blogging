import React from "react";
import { Input, Button } from "antd";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import classes from "./account.module.scss";
import { signIn } from "next-auth/client";
import Link from "next/link";
import { createNotification } from "../../utils/createNotification";
import { useRouter } from "next/router";

export const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submit = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      createNotification("Success", "login success", "success");
      setEmail("");
      setPassword("");
      router.back();
    } else {
      createNotification("Error Occurred", result.error, "error");
    }
    setLoading(false);
  };
  return (
    <div className={classes.form}>
      <div className={classes.formTitle}>login</div>
      <div className={classes.formItems}>
        <form
          className={classes.formItems}
          submit={(event) => {
            event.preventDefault();
          }}
        >
          <Input
            placeholder="Email"
            size="large"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input.Password
            size="large"
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="primary"
            block
            onClick={submit}
            loading={loading}
            htmlType="submit"
          >
            Login
          </Button>
        </form>
        <div className={classes.otherBtn}>
          <div>
            <Link href="/forget">Forget Password ?</Link>
          </div>
          <div>
            <Link href="/account/register">New Here ? Registration</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
