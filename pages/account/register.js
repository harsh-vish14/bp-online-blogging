import React from "react";
import { getSession } from "next-auth/client";
import { Registration } from "../../components/account/registration.component";
import Head from "next/head";

export default () => (
  <>
    <Head>
      <title>BP / LOGIN</title>
    </Head>
    <Registration />
  </>
);

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
