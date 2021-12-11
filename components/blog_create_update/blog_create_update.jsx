import React from "react";
import { Input, Button } from "antd";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMutation } from "react-apollo";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Spinner } from "../loaders/spinner";
import { gql } from "apollo-boost";
import { useSession } from "next-auth/client";
import { createNotification } from "../../utils/createNotification";
import { uploadImages } from "../../utils/uploadImages";
import { InMemoryCache } from "apollo-cache-inmemory";
import classes from "./blog_create_update.module.scss";

const STARTER_CODE = `# Getting Started

Welcome Here this is your editor ---> that is your preview of MD code / HTML Code
Here you can add

MD 
> THIS IS MD (MARKDOWN) CODE

HTML
<h1>This is HTML CODE</h1>`;

const DEFAULT_COVER_PHOTO =
  "https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=100";

const ADD_BLOG = gql`
  mutation addBlog(
    $creator: ID!
    $coverPhoto: String
    $title: String!
    $content: String!
    $isPrivate: Boolean
  ) {
    addBlog(
      creator: $creator
      coverPhoto: $coverPhoto
      title: $title
      content: $content
      isPrivate: $isPrivate
    ) {
      success
      message
      blog {
        creator {
          id
          username
        }
        isPrivate
        title
        likes
        coverPhoto
        updatedAt
        id
      }
    }
  }
`;

export const Creat_Update_Blog = ({ blog }) => {
  const [session, loadingSession] = useSession();
  const [addBlog, { data, loading, error }] = useMutation(ADD_BLOG);
  const [imageFile, setImageFile] = React.useState(null);
  const [imageFileImage, setImageFileImage] =
    React.useState(DEFAULT_COVER_PHOTO);
  const [imageUrl, setImageUrl] = React.useState(
    blog?.coverPhoto || DEFAULT_COVER_PHOTO
  );
  const [title, setTitle] = React.useState(blog?.title || "");
  const [content, setContent] = React.useState(blog?.content || STARTER_CODE);
  const [isPrivate, setIsPrivate] = React.useState(blog?.isPrivate || false);

  const imageAdded = (image) => {
    const currentImage = image.target.files[0];
    setImageFile(currentImage);
    const url = URL.createObjectURL(currentImage);
    setImageFileImage(url);
  };

  const createBlog = async () => {
    if (imageFile) {
      await uploadImages(imageFile, "coverImage/", submitWithImage);
    } else {
      await addBlog({
        variables: {
          creator: session.user.id,
          coverPhoto: null,
          title: title,
          content: content,
          isPrivate: isPrivate,
        },
      });
    }
    // if (!imageFile) {
    // } else {
    // }
  };
  const submitWithImage = async (image) => {
    console.log(image);
    await addBlog({
      variables: {
        creator: session.user.id,
        coverPhoto: image,
        title: title,
        content: content,
        isPrivate: isPrivate,
      },
      //   update: (cache) => {
      //     cache.writeData({ data: {} });
      //   },
    });
  };
  React.useEffect(() => {
    (async () => {
      const cache = new InMemoryCache();

      if (data) {
        console.log(data);
        createNotification("Blog Created", data.addBlog.message, "success");
      }
      if (error) {
        //   console.log(JSON.stringify(error));
        createNotification(
          "Error Occurred",
          error.graphQLErrors[0].message,
          "error"
        );
      }
    })();
  }, [data, error]);
  if (loading) {
    <div>
      <Spinner />
    </div>;
  }
  return (
    <>
      <div className={classes.btns}>
        <Button
          type="primary"
          disabled={content.length === 0 || title.length === 0}
          onClick={createBlog}
        >
          Create Blog
        </Button>
        {isPrivate ? (
          <Button
            style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
          >
            <AiOutlineEyeInvisible /> Private
          </Button>
        ) : (
          <Button
            style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
          >
            <AiOutlineEye /> Public
          </Button>
        )}
      </div>
      <section className={classes.topSection}>
        <div className={classes.coverPhoto}>
          <div className={classes.titleImage}>
            <Image
              src={imageFileImage}
              alt={title}
              objectFit="cover"
              objectPosition="center"
              layout="fill"
            />
            <label className={classes.editBackground} htmlFor="inputImage">
              EDIT
            </label>
            <input
              id="inputImage"
              type="file"
              accept="image/jpeg,image/png"
              style={{ display: "none" }}
              onChange={imageAdded}
            />
          </div>
        </div>
        <div className={classes.title}>
          <Input
            placeholder="Blog Title"
            size="large"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </section>
      <section className={classes.editor}>
        <MdEditor
          style={{ height: "100%" }}
          value={content}
          onChange={(e) => {
            setContent(e.text);
          }}
          renderHTML={(text) => {
            return (
              <ReactMarkdown
                linkTarget="_blank"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                children={text}
              />
            );
          }}
        />
      </section>
    </>
  );
};
