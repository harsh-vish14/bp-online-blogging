import { getSession } from "next-auth/client";
import React from "react";
import { Creat_Update_Blog } from "../../components/blog_create_update/blog_create_update";
import { Blog } from "../../models/blogs/Blog";

export default ({ blog }) => {
  return <Creat_Update_Blog blog={blog} />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      notFound: true,
    };
  }
  const { blogtype } = context.params;
  console.log(blogtype);
  if (blogtype === "create") {
    return {
      props: {
        blog: null,
      },
    };
  }

  const normalTitle = String(blogtype).split("-").join(" ");

  const blog = await Blog.findOne({ title: normalTitle });
  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
};
