import { Button } from "antd";
import React from "react";
import { RESET_PASSWORD } from "../querys/query";
import { useMutation } from "react-apollo";
import { createNotification } from "../../utils/createNotification";

export const ResetButton = () => {
  const [loading, setLoading] = React.useState(false);
  const [resetPassword, { data, error }] = useMutation(RESET_PASSWORD);
  React.useEffect(() => {
    if (data) {
      setLoading(false);
      createNotification(
        "Email send successfully",
        "Reset Link has send your registered email id",
        "success"
      );
    }
    if (error) {
      setLoading(false);
      createNotification(
        "Error Occurred",
        "Some error occurred, Please try again later",
        "error"
      );
    }
  }, [data, error]);

  return (
    <Button
      type="primary"
      danger
      ghost
      loading={loading}
      onClick={() => {
        setLoading(true);
        resetPassword({});
      }}
    >
      Reset Password
    </Button>
  );
};
