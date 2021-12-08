import { useRouter } from "next/router";
import { User } from "../../models/user/User";
import { Blog } from "../../models/blogs/Blog";
import ErrorPage from "next/error";
import { useSession } from "next-auth/client";
import React from "react";

export default ({ blogData }) => {
  const [session, loading] = useSession();
  const [errorFound, setErrorFound] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (!loading) {
      if (session && String(blogData.creator._id) !== session.user.id) {
        console.log(String(blogData.creator._id), session.user.id);
        setErrorFound(true);
      } else if (!session) {
        if (blogData.isPrivate) {
          console.log(blogData.isPrivate);
          setErrorFound(true);
        }
      }
    }
  }, [loading]);

  if (errorFound) {
    return <ErrorPage statusCode={404} />;
  }

  return <div>Blog details {blogData.title}</div>;
};

export const getStaticProps = async (context) => {
  const { blog } = context.params;
  console.log(blog);
  if (blog.length < 0) {
    return {
      notFound: true,
    };
  }
  const creatorName = blog[0];
  const blogTitle = blog[1];
  console.log(creatorName, blogTitle);
  const username = creatorName.split("@").join("");
  const userData = await User.findOne({ username });

  const normalTitle = String(blogTitle).split("-").join(" ");

  const blogData = await Blog.findOne(
    {
      title: { $regex: normalTitle, $options: "i" },
    },
    { comments: 0, createdAt: 0 }
  ).populate("creator", "name username profileImage");
  console.log(blogData?._id, userData?._id);
  if (!blogData || !userData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      blogData: JSON.parse(JSON.stringify(blogData)),
    },
  };
};
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
