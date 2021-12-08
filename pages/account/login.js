import { getSession } from "next-auth/client";
import React from "react";
import { Login } from "../../components/account/login.conponent";

export default () => {
  return <Login />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
