import { getSession } from "next-auth/client";
import React from "react";
import { Creat_Update_Blog } from "../../components/blog_create_update/create_update_blog";
import Head from "next/head";
import { Blog } from "../../models/blogs/Blog";

export default ({ blog, blogtype }) => {
  console.log("CLient: ", blogtype);
  return (
    <>
      <Head>
        <title>
          BP /{" "}
          {blogtype === "create"
            ? `Create A New Blog`
            : `Edit - ${blog?.title}`}
        </title>
        <meta
          name="description"
          content={
            blogtype === "create"
              ? "Create A new Blog"
              : `Edit the blog - ${blog?.title}`
          }
        ></meta>
      </Head>
      <Creat_Update_Blog blog={blog} />
    </>
  );
  // return <div>hello</div>;
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
        blogtype,
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
      blogtype: blogtype,
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
};
