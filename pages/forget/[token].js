import { Forget } from "../../components/forget/forgetWithToken.componet";
import Head from "next/head";

export default () => {
  return (
    <>
      <Head>
        <title>BP / FORGET PASSWORD</title>
        <meta
          name="description"
          content={"Forget Password to set a new Password to your account"}
        ></meta>
      </Head>
      <Forget />
    </>
  );
};
