import { getSession, useSession } from "next-auth/client";
import { Creator } from "../../components/creator/creator.components";
import { User } from "../../models/user/User";

export default ({ userData }) => {
  const [session, loading] = useSession();
  return (
    <Creator
      userData={userData}
      myProfile={!loading && session && session.user.id == String(userData._id)}
    />
  );
};

export const getStaticProps = async (context) => {
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
      userData: JSON.parse(JSON.stringify(userData)),
      revalidate: 3600,
    },
  };
};
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
