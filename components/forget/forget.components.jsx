import React from "react";
import { Input, Button } from "antd";
import { FORGET_PASSWORD } from "../querys/query";
import { useMutation } from "react-apollo";
import { createNotification } from "../../utils/createNotification";
import classes from "./forget.module.scss";

export const Forget = () => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [forgetPassword, { data, error }] = useMutation(FORGET_PASSWORD);

  const handlerClicked = () => {
    setLoading(true);
    forgetPassword({
      variables: {
        email,
      },
    });
  };

  React.useEffect(() => {
    if (data) {
      createNotification(
        "Email send successfully",
        "Forget Password email sent successfully, to your email address",
        "success"
      );
      setLoading(false);
    }
    if (error) {
      for (let i = 0; i < error.graphQLErrors.length; i++) {
        const message = error.graphQLErrors[i].message;
        createNotification("Error Occurred", message, "error");
      }
      setLoading(false);
    }
  }, [data, error]);
  return (
    <div className={classes.forget}>
      <h1>Forget Password</h1>
      <Input
        placeholder="Email"
        size="large"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        type="primary"
        size="large"
        loading={loading}
        onClick={handlerClicked}
      >
        Forget Password
      </Button>
    </div>
  );
};
