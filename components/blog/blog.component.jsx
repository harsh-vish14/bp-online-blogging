import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import classes from "./blog.module.scss";
import { CommentComponent } from "../comment/comment.component";

export const BlogCompo = ({ blog }) => {
  return (
    <section className={classes.blogMain}>
      <div className={classes.titleImage}>
        <Image
          src={blog.coverPhoto}
          alt={blog.title}
          objectFit="cover"
          objectPosition="center"
          layout="fill"
        />
      </div>
      <Link href={`/creator/@${blog.creator.username}`}>
        <a style={{ color: "black" }}>
          <div className={classes.creator}>
            <div className={classes.profile}>
              <Avatar src={blog.creator.profileImage} size={40} />
            </div>
            <div className={classes.name}>
              {blog.creator.name}
              <div className={classes.username}>@{blog.creator.username}</div>
            </div>
          </div>
        </a>
      </Link>
      <h1 className={classes.BlogTitle}>{blog.title}</h1>
      <main>
        <ReactMarkdown
          children={blog.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  // style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </main>
      <CommentComponent />
    </section>
  );
};
