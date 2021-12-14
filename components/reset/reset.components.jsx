import React from "react";
import { useRouter } from "next/router";
import { Input, Button } from "antd";
import { RESET_PASSWORD_WITH_TOKEN } from "../querys/query";
import { useMutation } from "react-apollo";
import { createNotification } from "../../utils/createNotification";
import classes from "./reset.module.scss";

export const Reset = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [resetPassword, { data, error }] = useMutation(
    RESET_PASSWORD_WITH_TOKEN
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
    if (oldPassword === newPassword) {
      createNotification(
        "Error Occurred",
        "Old password can not be same as new password",
        "error"
      );
      setNewPassword("");
      setLoading(false);
      return;
    }
    resetPassword({
      variables: {
        token,
        oldPassword,
        newPassword,
      },
    });
  };

  return (
    <div className={classes.reset}>
      <h1>Reset Password</h1>
      <Input.Password
        placeholder="Old Password"
        size="large"
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <Input.Password
        placeholder="New password"
        size="large"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
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
