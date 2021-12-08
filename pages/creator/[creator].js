import { getSession } from "next-auth/client";
import { User } from "../../models/user/User";

export default ({ username, myProfile }) => {
  console.log({ username, myProfile });
  return (
    <div>
      creator details: {username}, {myProfile}{" "}
    </div>
  );
};

export const getStaticProps = async (context) => {
  const session = await getSession(context);
  const { creator } = context.params;
  const username = creator.split("@").join("");
  const userData = await User.findOne({ username });
  if (!userData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      username,
      myProfile: String(userData?._id) === session?.user?.id || false,
    },
  };
};
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
