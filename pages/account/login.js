import { getSession } from "next-auth/client";
import React from "react";
import { Login } from "../../components/account/login.conponent";
import Head from "next/head";

export default () => {
  return (
    <>
      <Head>
        <title>BP / LOGIN</title>
      </Head>
      <Login />
    </>
  );
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
