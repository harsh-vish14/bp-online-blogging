import { Reset } from "../../components/reset/reset.components";
import Head from "next/head";

export default () => {
  return (
    <>
      <Head>
        <title>BP / RESET PASSWORD</title>
        <meta
          name="description"
          content={"Reset Password to set a new Password to your account"}
        ></meta>
      </Head>
      <Reset />
    </>
  );
};
