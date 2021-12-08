import React from "react";
import { getSession } from "next-auth/client";
import { Registration } from "../../components/account/registration.component";

export default () => <Registration />;

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
