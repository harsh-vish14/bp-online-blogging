import { Result, Button } from "antd";
import Link from "next/link";
import Head from "next/head";
// import { AiFillHome } from "react-icons/all";
const notFound = () => {
  return (
    <>
      {/* <Head>
        <title>Alumina Connect / 404 NOT-FOUND</title>
      </Head> */}
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            {/* <Link href="/">
              <a>
                <AiFillHome style={{ marginRight: "10px" }} /> Home
              </a>
            </Link> */}
          </Button>
        }
      />
    </>
  );
};

export default notFound;
