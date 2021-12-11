import { getSession } from "next-auth/client";
import { Creator } from "../../components/creator/creator.components";
import { User } from "../../models/user/User";

export default ({ username, myProfile, userData }) => {
  // console.log({ username, myProfile, userData });
  return <Creator userData={userData} myProfile={myProfile} />;
};

export const getStaticProps = async (context) => {
  const session = await getSession(context);
  const { creator } = context.params;
  const username = creator.split("@").join("");
  const userData = await User.findOne(
    { username },
    { blogs: 0, resetToken: 0, password: 0 }
  );
  if (!userData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      username,
      myProfile: String(userData?._id) === session?.user?.id || false,
      userData: JSON.parse(JSON.stringify(userData)),
    },
  };
};
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
