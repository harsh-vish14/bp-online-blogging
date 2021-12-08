import { Result, Button } from "antd";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

let Error = ({ statusCode }) => {
  console.log("client side: ", statusCode);
  let errorMessage = "";
  if (statusCode === 404) {
    errorMessage = "Sorry, the page you visited does not exist.";
  } else {
    errorMessage = "Sorry, something went wrong";
  }
  return (
    <>
      <Result
        status={statusCode}
        title={statusCode}
        subTitle={errorMessage}
        extra={
          <Button type="primary">
            <Link href="/">
              <a>
                <AiFillHome style={{ marginRight: "10px" }} /> Home
              </a>
            </Link>
          </Button>
        }
      />
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
