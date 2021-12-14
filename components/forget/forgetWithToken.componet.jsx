import React from "react";
import { useRouter } from "next/router";
import { Input, Button } from "antd";
import { FORGET_PASSWORD_WITH_TOKEN } from "../querys/query";
import { useMutation } from "react-apollo";
import { createNotification } from "../../utils/createNotification";
import classes from "./forget.module.scss";

export const Forget = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [resetPassword, { data, error }] = useMutation(
    FORGET_PASSWORD_WITH_TOKEN
  );

  React.useEffect(() => {
    if (data) {
      createNotification(
        "Reset successfully",
        "Password has changed",
        "success"
      );
      setLoading(false);
      router.replace("/");
    }
    if (error) {
      for (let i = 0; i < error.graphQLErrors.length; i++) {
        const message = error.graphQLErrors[i].message;
        createNotification("Error Occurred", message, "error");
      }
      setLoading(false);
    }
  }, [data, error]);

  const handlerClicked = () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      createNotification(
        "Error Occurred",
        "Password is did not match with confirm password",
        "error"
      );
      setNewPassword("");
      setLoading(false);
      return;
    }
    resetPassword({
      variables: {
        token,
        newPassword,
        confirmPassword,
      },
    });
  };

  return (
    <div className={classes.forget}>
      <h1>Forget Password</h1>
      <Input.Password
        placeholder="New Password"
        size="large"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <Input.Password
        placeholder="Confirm password"
        size="large"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <Button
        type="primary"
        size="large"
        loading={loading}
        onClick={handlerClicked}
      >
        Reset Password
      </Button>
    </div>
  );
};
